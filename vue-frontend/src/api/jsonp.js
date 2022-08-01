// import jsonp from 'jsonp'
// export function reqWeather(city){
//     const url=`
//     https://www.yiketianqi.com/free/day?appid=71479686&appsecret=5TrIYgWA&city=${city}
//     `
//     return new Promise((resolve,reject)=>{
//         jsonp(url,{
//             param:'callback'
//         },(error,response)=>{
//             if(!error&&response.cityid){
//                 const {tem_day,tem_night,wea_img,wea}=response
//                 resolve({tem_day,tem_night,wea_img,wea})
//             }else{
//                 console.log('获取天气信息失败');
//             }
//         })
//     })
// }

import jsonp from 'jsonp'
export function reqWeather(city){
    const url = `https://www.yiketianqi.com/free/day?appid=71479686&appsecret=5TrIYgWA&city=${city}`

    return new Promise((resolve,reject)=>{
        jsonp(url,{
            param:'callback',
        },(error,response)=>{
            if(!error && response.cityid){
                const {wea,wea_img,tem_day,tem_night} = response
                resolve({wea,wea_img,tem_day,tem_night})
            }else{
                console.log("获取天气信息失败");
            }
        })
    })
}