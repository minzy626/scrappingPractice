export default interface movieData {
    title  : string;
    imgUrl : string;
    grade? : string;
    score  : string;
    genre? : string;
    actor? : string;
    releasedDay:string;
    link   : string;
}

/**
 *  title  : string;     영화제목 string
    imgUrl : string;     이미지url string
    grade? : string;     영화등급 daum은 없고 naver는 확인가능하여 ? 붙여서 string
    score  : string;     영화평점
    genre? : string;     영화장르 daum은 없고 naver는 확인가능하여 ? 붙여서 string
    actor? : string;     출연배우 daum은 없고 naver는 확인가능하여 ? 붙여서 string
    releasedDay:string;  개봉일 daum은 없고 naver는 확인가능하여 ? 붙여서 string
    link   : string;     상세보기 link string
 * 
 */