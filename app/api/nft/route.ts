import { chromium } from 'playwright';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}

export async function POST(req: NextRequest) {
  const prompt = await req.json();
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://deepai.org/machine-learning-model/text2img');
    await page.getByPlaceholder('Enter your prompt or just click generate to get inspired').fill(prompt.text);
    await page.getByRole('button', { name: 'Generate' }).click();

    let isReadyToDownload = await page.locator('#download-button').getAttribute('imagewasgenerated');
    while (isReadyToDownload === 'False') {
      isReadyToDownload = await page.locator('#download-button').getAttribute('imagewasgenerated');
    }

    const imageElement = await page.$('.try-it-result-area img');
    if (imageElement == null) throw new Error("No se encontró la imagen");
    const imageUrl = await imageElement.getAttribute('src');

    await browser.close();

    return NextResponse.json({ imageUrl });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.stack);
      return NextResponse.json({
        message: err.message
      });
    }
  }
}
