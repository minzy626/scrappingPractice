const axios = require("axios");
const cheerio = require("cheerio");

  /**
   * Naver영화의 정보를 스크래핑하는 함수
   * param으로 url을받아 현재상영장, 예정작을 각 리턴
    */
export const getNaverMovie = async (url) =>{
    try{
        let html = await axios.get(url);
        let movieList =[];
        const $ =cheerio.load(html.data);
        const $movieSection = $("div.lst_wrap ul").children("li");
        $movieSection.each(function (){
            movieList.push({
                title : $(this).find("dl.lst_dsc dt.tit a").text(),
                imgUrl : $(this).find("div.thumb img").attr('src'),
                grade : $(this).find("dl.lst_dsc dt.tit span").text(),
                score : $(this).find("dl.lst_dsc dd div.star_t1 span.num").text(),
                releasedDay:$(this).find("dl.lst_dsc dl.info_txt1 dd").first().text(),
                genre :$(this).find("dl.lst_dsc dd dl.info_txt1 dd span.link_txt a").first().text(),
                actor :$(this).find("dl.lst_dsc dd dl.info_txt1 dd").eq(2).text(),
                link :$(this).find("div.thumb a").attr('href')
            });
        });
        return movieList;
    }catch(error) {
        console.error(error);
    }
}


/**
 * 다음영화의 정보를 스크래핑하는 함수
 * param으로 url을받아 현재상영장, 예정작을 각 리턴
*/
export const getDaumMovie = async () =>{
    try{
        let html = await axios.get("https://movie.daum.net/premovie/theater?flag=Y");
        let movieList =[];
            const $ =cheerio.load(html.data);
            const $movieSection = $("div.box_movie ol").children("li");
            $movieSection.each(function (itm){
                movieList[itm]={
                    title : $(this).find("div.thumb_cont strong a").text(),
                    imgUrl : $(this).find("div.thumb_cont div.poster_movie img").attr('src'),
                    // grade : $(this).find("dl.lst_dsc dt.tit span").text(),
                    score : $(this).find("div.thumb_cont span.txt_append span.txt_grade").text(),
                    releasedDay :$(this).find("div.thumb_cont span.txt_append span.txt_info span.txt_num").text(),
                    // genre :$(this).find("dl.lst_dsc dd dl.info_txt1 dd span.link_txt a").first().text(),
                    // actor :$(this).find("dl.lst_dsc dd dl.info_txt1 dd span.link_txt a").text()
                };
            });
            console.log(movieList)
            return movieList;
    }catch(error) {
        console.error(error);
    }
}
// getDaumMovie();


