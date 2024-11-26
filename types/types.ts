export interface Nft {
  title: string;
  image: string;
  autor: string;
  price: string;
}

export type NftPrompt = {
	name: string, 
	description: string,
	prompt: string
}

export type MetaData = {
	image: string,
	name: string,
	description: string,
	attributes: Object[]
}
