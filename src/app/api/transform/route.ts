import { NextRequest, NextResponse } from "next/server";
import OpenAI, { toFile } from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load reference boar images
function getReferenceBuffers(): { buffer: Buffer; name: string }[] {
  const samplesDir = path.join(process.cwd(), "public", "samples");
  try {
    return fs
      .readdirSync(samplesDir)
      .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort()
      .map((f) => ({
        buffer: fs.readFileSync(path.join(samplesDir, f)),
        name: f,
      }));
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured. Add OPENAI_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    if (imageFile.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image too large. Maximum 20MB." },
        { status: 400 }
      );
    }

    // Convert uploaded file to buffer
    const bytes = await imageFile.arrayBuffer();
    const uploadBuffer = Buffer.from(bytes);

    // Get reference images
    const refs = getReferenceBuffers();

    // Build uploadable files array
    const uploadableFiles = [];

    // User's photo first
    const userFile = await toFile(uploadBuffer, "user_photo.png", {
      type: imageFile.type,
    });
    uploadableFiles.push(userFile);

    // Add reference boar images (up to 4)
    for (const ref of refs.slice(0, 4)) {
      const refFile = await toFile(ref.buffer, ref.name, {
        type: ref.name.endsWith(".png") ? "image/png" : "image/jpeg",
      });
      uploadableFiles.push(refFile);
    }

    const prompt = `I have provided multiple images. The FIRST image is a photo of a person that needs to be transformed. The OTHER images are reference examples of the "boarified" style I want.

Looking at the reference examples, you can see the style: humans morphed into boar/pig hybrid creatures - human features blended with pig/boar features like snouts, tusks, pig noses, and boar-like faces. Some show a human face on a pig/boar body, others show a pig/boar face with human-like expressions.

Now take the FIRST image (the person's photo) and BOARIFY them in this same style:
- Transform their face into a boar/pig hybrid - add a pig snout, tusks, boar-like features
- Keep elements of their original appearance recognizable (hair style, clothing, accessories, background)
- Make it look like a funny, meme-worthy human-boar hybrid
- The result should be humorous and shareable
- Photorealistic rendering with the absurd boar transformation
- Keep the same general pose and composition as the original photo`;

    const response = await openai.images.edit({
      model: "gpt-image-2",
      image: uploadableFiles,
      prompt,
      size: "1024x1024",
      quality: "high",
    });

    const generatedImage = response.data?.[0];
    if (!generatedImage?.b64_json) {
      return NextResponse.json(
        { error: "Failed to generate boarified image" },
        { status: 500 }
      );
    }

    const resultDataUrl = `data:image/png;base64,${generatedImage.b64_json}`;

    return NextResponse.json({ image: resultDataUrl });
  } catch (error: unknown) {
    console.error("Boarification error:", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Rate limited. Please wait a moment and try again." },
          { status: 429 }
        );
      }
      if (error.status === 403) {
        return NextResponse.json(
          { error: "OpenAI API access denied. Organization verification may be required." },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error during boarification" },
      { status: 500 }
    );
  }
}
