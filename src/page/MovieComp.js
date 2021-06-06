import React, { useEffect, useState } from 'react';
import { MovieItm } from '.';
import { getNaverMovie } from '../getMovieService';

export function MovieComp(props){
    const [viewFlag,setViewFlag] =useState(true);//true 상영작 false 개봉예정작

    const [searchInput, setSearchInput] = useState('');   //검색어 인풋값
    const [searchType, setSearchType] = useState('title');//검색어 조건값
    const [nowMovieList, setNowMovieList] = useState([]); //현재상영작 리스트
    const [nowMovieListInit, setNowMovieListInit] = useState([]);//현재영작 원본(검색시 다상시 크롤링 하지않으려고)
    const [tobeMovieList, setTobeMovieList] = useState([]);//상영예정작 리스트
    const [tobeMovieListInit, setTobeMovieListInit] = useState([]);//상영예정작 원본(검색시 다상시 크롤링 하지않으려고)

    const nowShowing ="/movie/running/current.nhn";  //네이버 현재상영작 url
    const toBeReleased ="movie/running/premovie.nhn";//네이버 상영예정작 url
    
    useEffect(()=>{ 
        /**
         * promise가 정상적으로 반환되면 then실행하여 영화리스트에 setValue
         */
        getNaverMovie(nowShowing).then(res => {
                                        setNowMovieList(res);
                                        setNowMovieListInit(res);})
                       .catch(err =>console.log(err));
        getNaverMovie(toBeReleased).then(res => {
                                        setTobeMovieList(res);
                                        setTobeMovieListInit(res);
                                    })
                       .catch(err =>console.log(err));
    },[])
    /**
     * 검색어 버튼 혹은 Enter입력시 실행되는 검색함수
     * param 은 검색어와 검색조건
     * return은 검색된 결과 (viewtype 따라 setList달라짐)
     */
    const searchMovie =(input,type="title",viewType=true)=>{
        let result =[];
        if(type==="title")result =findWordTitle(input,viewType);
        if(type==="genre")result =findWordGenre(input,viewType);
        if(type==="actor")result =findWordActor(input,viewType);

        viewType?setNowMovieList(result):setTobeMovieList(result);
    }
    /**
     * 검색조건 제목일때 실행되는 함수
     * param 은 검색어와
     * return은 검색어가 포함된 영화리스트
     */
    const findWordTitle =(input,viewType)=>{
        let result =viewType?
                    nowMovieListInit.filter(itm=>{
                        return itm.title.indexOf(input)>-1
                    })
                    :tobeMovieListInit.filter(itm=>{
                        return itm.title.indexOf(input)>-1
                    })
        return result;
    }
    /**
     * 검색조건장르 실행되는 함수
     * param 은 검색어와
     * return은 검색어가 포함된 영화리스트
     */
    const findWordGenre =(input,viewType)=>{
        let result =viewType?
            nowMovieListInit.filter(itm=>{
                return itm.genre.indexOf(input)>-1
            })
            :tobeMovieListInit.filter(itm=>{
                return itm.genre.indexOf(input)>-1
            })
        return result;
    }
     /**
     * 검색조건배우일떄 실행되는 함수
     * param 은 검색어와
     * return은 검색어가 포함된 영화리스트
     */
    const findWordActor =(input,viewType)=>{
        let result =viewType?
            nowMovieListInit.filter(itm=>{
                return itm.actor.indexOf(input)>-1
            })
            :tobeMovieListInit.filter(itm=>{
                return itm.actor.indexOf(input)>-1
            })
        return result;
    }
     /**
     * 검색초기화
     */
    const reset =()=>{
        getNaverMovie(nowShowing).then(res => {
                                         setNowMovieList(res);})
                                 .catch(err =>console.log(err));
        getNaverMovie(toBeReleased).then(res => {
                                        setTobeMovieList(res);})
                                    .catch(err =>console.log(err));
    }
return <>
        <div className="searchArea" style={{margin:"20px"}}>
            <div className="searchTypeArea" style={{display:'inline-block'}}>
                <input type="radio" name="searchType"   defaultChecked
                        onChange={(e)=>{setSearchType('title')}}/>
                        제목
                <input type="radio" name="searchType"
                        onChange={(e)=>{setSearchType('genre')}}/>
                        장르
                <input type="radio" name="searchType"
                        onChange={(e)=>{setSearchType('actor')}}/>
                        출연진
            </div>
            <input
                style={{width:"200px"}}
                value ={searchInput}
                onKeyDown={(e)=>{if(e.key==="Enter")searchMovie(searchInput,searchType,viewFlag)}}
                onChange={(e)=>{setSearchInput(e.target.value)}}/>
            <button style={{marginLeft:"20px"}}
                    onClick={()=>{searchMovie(searchInput,searchType,viewFlag)}}>검색</button>
            <button style={{marginLeft:"20px"}}
                    onClick={()=>{reset()}}>검색초기화</button>
        </div>
        <div className ="typeArea" style={{margin:"20px"}}>
            <span onClick={()=>setViewFlag(true)} > 상영작 </span> |
            <span onClick={()=>setViewFlag(false)}> 예정작 </span>
        </div>
        <div className ="movieArea" style={{margin:"0px"}}>
        {viewFlag?
            <div style={{margin:"20px"}}>
            <span>상영작 리스트</span>
            {nowMovieList.map(itm=><><MovieItm movie={itm}  type={"now"}/></>)}
            </div>
            :
            <div style={{margin:"20px"}}>
            <span>예정작 리스트</span>   
            {tobeMovieList.map(itm=><><MovieItm movie={itm} type={"pre"}/></>)}
        </div>
       }
       </div>
</>
};
export default MovieComp;