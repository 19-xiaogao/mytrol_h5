import {getFileType} from '@/static/js/global.js'
let gifImg=[{
						img2: 'https://oss.mytrol.cn/uni_mytrol/img/nft_bg2.png',
						img_light: 'https://oss.mytrol.cn/uni_mytrol/img/nft_light_1.png',
						img_foot: 'https://oss.mytrol.cn/uni_mytrol/icon/my_nft_option_nft_bg.png',
					},
					{
						img2: 'https://oss.mytrol.cn/uni_mytrol/img/nft_bg2.png',
						img_light: 'https://oss.mytrol.cn/uni_mytrol/img/nft_light_2.png',
						img_foot: 'http://oss.mytrol.cn/uni_mytrol/img/my_nft_option_nft_bg_1.png',
					},
				];
				
				
				
				export let isGif=(url,key='img_light')=> {
					let type = getFileType(url);
					let returnUrl='';
					console.log(type,key)
					let arr = ['gif']

					if (arr.indexOf(type) !== -1) {
						returnUrl= key?gifImg[1][key]:true
					}else{
						returnUrl=  key?gifImg[0][key]:false
					}
					
				console.log(returnUrl)
				return returnUrl
				}
				