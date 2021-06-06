export function MovieItm(props){
    const {movie, type}=props;                  //props로 영화랑 타입받음
    /**
     *문자열로 된 평점 float 로 변환하여 2자리 자르기
     */
    const makeScoreToNumber = (score)=>{
        let target =parseFloat(score);
        target = Math.round(target*100)/100
        return target;
    }
    let score =makeScoreToNumber(movie.score);    //평점 소숫점 2자리까지 자르기
    let releasedDay = movie.releasedDay.split("|")//개봉일만 추출
    
    return <>
        <div style={{display:"flex"}}>
            <span>
                <a href={`https://movie.naver.com/movie${movie.link}`}>
                <img src={movie.imgUrl} alt={movie.title} />
                </a>
            </span>
            <div style={{display:"inline-grid"}}>
                <h4>{movie.title}</h4>
                <span> {type==="now"&&score}</span>
                <span> {movie.grade}</span>
                <span> {releasedDay[releasedDay.length-1]}</span>
                <span> {movie.genre}</span>
                <span> {movie.actor}</span>
            </div>
        </div>
</>}

export default MovieItm;