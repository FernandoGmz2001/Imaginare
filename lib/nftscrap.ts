import { chromium } from "@playwright/test"
import path from "path";
import fs from 'fs'
import { User } from "@/types/types";
const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

console.log(UPLOAD_DIR);
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}
export async function scrappImage(prompt: string, user: User){
	console.log('Creando navegador...')
	const browser = await chromium.launch()
	const context = await browser.newContext()
	console.log('Generando contexto...')
	try{
		console.log('Accediendo a la pagina...')
		const page = await context.newPage()
		await page.goto('https://deepai.org/machine-learning-model/text2img')
		console.log('Rellenando input con el prompt...')
		await page
			.getByPlaceholder('Enter your prompt or just click generate to get inspired')
			.fill(prompt)
		await page
					.getByRole('button', {name: 'Generate'}).click()
		console.log('Generando imagen...')
		let isReadyToDownload = await page
			.locator('#download-button')
			.getAttribute('imagewasgenerated')
		while(isReadyToDownload === 'False'){
			isReadyToDownload = await page.locator('#download-button')
																		.getAttribute('imagewasgenerated')
		}
		console.log('Descargando imagen...')
		const downloadPromise = page.waitForEvent('download')
		await page
			.locator('#download-button')
			.click()
		const download = await downloadPromise

		await download.saveAs(`${UPLOAD_DIR}/${user.userId}-${user.firstName}/` + download.suggestedFilename())
		console.log('Imagen descargada')
		return download.suggestedFilename()
	}catch(err){
		if(err instanceof Error){
			throw err
		}
	}finally{
		await browser.close()
	}
}

// async function scrappImageApi(prompt){
// 	const data = await fetch('https://api.deepai.org/api/text2img', {
//     method: 'POST',
//     body: {
//       text: `${prompt}. Estilo pixel art 8 bit.`,
//       image_generator_versions: "standard",
//       use_old_movel: false,
//       turbo: true,
//       genius_preference: 'classic'
//     }
// 	})
//   console.log(data)
// 	return data.data
// }

//scrappImageApi('Una noche estrellada')
//scrappImage('Una noche estrellada' +' estilo pixel')