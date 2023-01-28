// * 공통

  // <전체글 객체>

  const 전체글 = {
      ['+20221221'] : {
        수필 : ['데자와'],
      },
      ['+20221220'] : {
        코딩 : ['기록을 시작하며', '신기루 프로젝트', '신기루1 블로그 만들기'],
      },
      ['+20221123'] : {
        수필 : ['핏값'],
      },
      ['+20221030'] : {
        수필 : ['죽어 마땅한', '엄마의 고집', ],
      },
      ['+20220907'] : {
        수필 : ['미용실 블루', ],
      },
      ['+20220828'] : {
        수필 : ['용식이와 형설지공 대작전', ],
      },
      ['+20220729'] : {
        수필 : ['앞머리와 긴 머리', ],
      },
      ['+20220609'] : {
        수필 : ['월간 피자', ],
      },
      ['+20220524'] : {
        수필 : ['스윗 드림', ],
      },
      ['+20220403'] : {
        수필 : ['우리집 개', ],
      },
      ['+20220125'] : {
        수필 : ['아무것도 되어내지 못했다는 실감', ],
      },
      ['+20211224'] : {
        수필 : ['숙면의 아이유', ],
      },
      ['+20210728'] : {
        수필 : ['자가 격리 해제', ],
      },
      ['+20210616'] : {
        수필 : ['자가 격리', ],
      },
      ['+20201123'] : {
        수필 : ['키보드 키보드 키보드', ],
      },
      ['+20201115'] : {
        수필 : ['밤', ],
      },
      ['+20201111'] : {
        수필 : ['등산', ],
      },
      ['+20200820'] : {
        수필 : ['페이볼잇 데이 오브 더 위크'],
      },
      ['+20200818'] : {
        수필 : ['빨간 휴지 줄까 파란 휴지 줄까'],
      },
      ['+20200816'] : {
        수필 : ['토토로'],
      },
      ['+20170918'] : {
        수필 : ['금연 이야기']
      },
      ['+20171001'] : {
        수필 : ['카운터 푸드']
      },
      ['+20161126'] : {
        수필 : ['귤 폭죽']
      },
      ['+20160712'] : {
        수필 : ['편의점 백야']
      },
      ['+19930318'] : {
        음료 : ['솔의눈', '제로코크', '하늘보리', ],
        행성 : ['수성', '금성', '지구', '목성', '토성', '천왕성', '명왕성', '달', ],
        기타 : ['작열'],
      },
    };

  // <카테고리 이름 배열>

  const Categories = ['수필', '코딩', '음료', '행성', '기타'];

  // <카테고리별 배열 변수>

  const 모든글 = Array_GetAllPosts();
  const 수필 = Array_GetByCategory('수필');
  const 코딩 = Array_GetByCategory('코딩');
  const 음료 = Array_GetByCategory('음료');
  const 행성 = Array_GetByCategory('행성');
  const 기타 = Array_GetByCategory('기타');

// * Make Array Functions

  // <모든 콘텐츠 모음 배열 제작 함수>

  function Array_GetAllPosts(){
    let a = [];
    for(let key in 전체글){
      //-> 모든 발행일에 대해 반복
      for(i = 0; i < Categories.length; i++){
        //-> 그리고 모든 카테고리에 대해 또 반복
        if(전체글[key][Categories[i]] !== undefined){
          //-> 안 해주면 결과값이 없는 순서에 출력 시 undefined가 표시됨!
          a = a.concat(전체글[key][Categories[i]])
            //-> 반복이 끝날 때마다 결과값을 배열 a에 순서대로 추가 
          }
        }
      }
    return a;
    };

    // <카테고리별 콘텐츠 배열 제작 함수>

    function Array_GetByCategory(CategoryName){
      let a = [];
      for(let key in 전체글){
        if(전체글[key][CategoryName] !== undefined){
        a = a.concat(전체글[key][CategoryName])
        }
      }
        return a;
    };

  // <한 달 단위 콘텐츠 배열 제작 함수>

  function Array_GetByYearMonth(연, 월){
  //-> '연'은 네 지리. ex) 2022. '월'은 한 자리나 두 자리 ex) 7, 12
    let a = (연.toString() + Plus0(월)) * 100;
    let b = (연.toString() + Plus0(월+1)) * 100;
    let c = [];
    for(let key in 전체글){
      if(a < key && key < b){
        for(i = 0; i < Categories.length; i++){
          if(전체글[key][Categories[i]] !== undefined){
          c = c.concat(전체글[key][Categories[i]])
          }
        }
      }
    }
    return c;
  };

    // <한 자릿수 숫자 두 자릿수로 만들기 함수>

    function Plus0(a){
      if(a < 10){
        a = '0' + a
      }
      return a;
    };
  
  // <우측 사이드바 1개월 단위 목록 만들기 함수>

  // function Array_YearMonthList(){
  //   let a = [];
  //   for(let key in 전체글){
  //     //-> for in문을 사용해 특정한 형태로 가공될 key를 전달해줄 것. 
  //     if(Slicer(key, 5, 2) < 10){
  //       //-> '월'이 한 자릿수인 key를 따로 분류. key에서 잘라줄 부분의 범위가 다르니까.
  //       let b = Slicer(key, 1, 4) + '년 ' + Slicer(key, 6, 1) + '월';
  //       //-> 7월이 07월처럼 어색하게 표시되지 않게 하려고 6index만 잘라 쓴다.
  //       a = a.concat(b);
  //     }
  //     else{
  //       //-> '월'이 두 자릿수인 key는 이쪽으로 분류된다.
  //       let c = Slicer(key, 1, 4) + '년 ' + Slicer(key, 5, 2) + '월';
  //       //-> '월' 첫 번째 자리에 '0'이 붙을 일이 없으니 5index부터 2길이만큼 잘라 쓴다. 
  //       a = a.concat(c);
  //     }
  //   }
  //   let d = [...new Set(a)];
  //   return d;
  //   //-> concat();으로 축적 & 변화된 배열 a 중 중복된 요소를 제거해준다. key에 3월이 두 개라서 '2022년 3월'이라는 요소가 배열에 두 번 포함되어버리니까. 
  // };

    // <key 문자열 자르기 함수>

    function Slicer(x, y, z){
      let a = x.substr(y, z);
      return Number(a);
      //-> 숫자로 변환하면서 숫자 앞의 '0' 삭제
    };

    function Slicer2(x, y, z){
      return x.substr(y, z);
      //-> 문자형이라 숫자 앞의 '0' 유지
    };


// * Print List Funtions

  // <배열 목록화 함수>

  function MakeList(Array){
    for(i = 0; i < Array.length; i++){
      document.write('<a href="' + Array[i] + '.html">' + Array[i] + '</a><br>')
    }
  };

  // <@본문_모든 콘텐츠 목록화 함수>

  // function Main_List_AllPosts(){
  //   MakeList(Array_GetAllPosts());
  // };

  function Main_List_AllPosts(){
    let a = [];
    for(let key in 전체글){
      //-> 모든 발행일에 대해 반복
      for(i = 0; i < Categories.length; i++){
        //-> 그리고 모든 카테고리에 대해 또 반복
        if(전체글[key][Categories[i]] !== undefined){
          for(j = 0; j < 전체글[key][Categories[i]].length; j++){
            a = a.concat('<p id = "Posts" style = "display: inline"><span style = "font-style: italic; font-family: D2coding;">' + Slicer2(key, 3, 2) + '/' + Slicer2(key, 5, 2) + '/' + Slicer2(key, 7, 2) + '</span>&nbsp;&nbsp;&nbsp;<a href="' + 전체글[key][Categories[i]][j] + '.html">' + 전체글[key][Categories[i]][j] + '</a><br></p>')
          }
          //-> 안 해주면 결과값이 없는 순서에 출력 시 undefined가 표시됨!
          
            //-> 반복이 끝날 때마다 결과값을 배열 a에 순서대로 추가 
        }
      }
    }
    for(i = 0; i < a.length; i++){
        document.write(a[i]);
    }
  }

  // <@본문_카테고리별 콘텐츠 목록화 함수>
  
  // function Main_List_PostsByCategoryName(CategoryName){
  //   MakeList(Array_GetByCategory(CategoryName));
  // };

  function Main_List_PostsByCategoryName(CategoryName){
    let a = [];
    for(let key in 전체글){
      if(전체글[key][CategoryName] !== undefined){
        for(i = 0; i < 전체글[key][CategoryName].length; i++){
          a = a.concat('<span style = "font-style: italic; font-family: D2coding;">' + Slicer2(key, 3, 2) + '/' + Slicer2(key, 5, 2) + '/' + Slicer2(key, 7, 2) + '</span>&nbsp;&nbsp;&nbsp;<a href="' + 전체글[key][CategoryName][i] + '.html">' + 전체글[key][CategoryName][i] + '</a><br>')
          console.log(key, i, 전체글[key][CategoryName][i])
        }
      }
    }
    for(i = 0; i < a.length; i++){
      document.write(a[i])
  };
}

  // <@본문_연월별 콘텐츠 목록화 함수>
  
  // function Main_List_PostsByYearMonth(연, 월){
  //   MakeList(Array_GetByYearMonth(연, 월));
  // };

  function Main_List_PostsByYearMonth(연, 월){
    //-> '연'은 네 지리. ex) 2022. '월'은 한 자리나 두 자리 ex) 7, 12
      let a = (연.toString() + Plus0(월)) * 100;
      let b = (연.toString() + Plus0(월+1)) * 100;
      let c = [];
      for(let key in 전체글){
        if(a < key && key < b){
          for(i = 0; i < Categories.length; i++){
            if(전체글[key][Categories[i]] !== undefined){
              for(j = 0; j < 전체글[key][Categories[i]].length; j++){
                c = c.concat('<span style = "font-style: italic; font-family: D2coding;">' + Slicer2(key, 3, 2) + '/' + Slicer2(key, 5, 2) + '/' + Slicer2(key, 7, 2) + '</span>&nbsp;&nbsp;&nbsp;<a href="' + 전체글[key][Categories[i]][j] + '.html">' + 전체글[key][Categories[i]][j] + '</a><br>')
            }
          }
        }
      }
    }
    for(i = 0; i < c.length; i++){
      document.write(c[i]);
    }
  }

  // <@사이드바_모든 글 목록화 함수>

  function Sidebar_List_AllPosts(){
    document.write('<a href = "모든 글.html" style = "margin-bottom: 5px; display: inline-block">모든 글</a>' + '<span style = "font-size: 10px"> (' + Array_GetAllPosts().length + ')</span><br>')
  };

  // <@사이드바_카테고리 목록화 함수>

  function Sidebar_List_Category(){
    let a = []; 
    for(i = 0; i < Categories.length; i++){
      document.write('<a href = "' + Categories[i] + '.html">- ' + Categories[i] + '</a>' + '<span style = "font-size: 10px"> (' + Array_GetByCategory(Categories[i]).length + ')</span><br>');
    }
  }

  // <@사이드바_연월 목록화 함수>

  function Sidebar_List_YearMonth(){
    let a = [];
    for(let key in 전체글){
      //-> for in문을 사용해 특정한 형태로 가공될 key를 전달해줄 것. 
      if(Slicer(key, 5, 2) < 10){
        //-> '월'이 한 자릿수인 key를 따로 분류. key에서 잘라줄 부분의 범위가 다르니까.
        let b = '<a href = "' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 6, 1) + '월.html" style = "font-style: italic">' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 6, 1) + '월</a>' + '<span style = "font-size: 10px"> (' + Array_GetByYearMonth(Slicer(key, 1, 4), Slicer(key, 6, 1)).length + ')</span><br>';
        //-> 7월이 07월처럼 어색하게 표시되지 않게 하려고 6index만 잘라 쓴다.
        a = a.concat(b);
      }
      else{
        //-> '월'이 두 자릿수인 key는 이쪽으로 분류된다.
        let c = '<a href = "' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 5, 2) + '월.html" style = "font-style: italic">' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 5, 2) + '월</a>' + '<span style = "font-size: 10px"> (' + Array_GetByYearMonth(Slicer(key, 1, 4), Slicer(key, 5, 2)).length + ')</span><br>';
        //-> '월' 첫 번째 자리에 '0'이 붙을 일이 없으니 5index부터 2길이만큼 잘라 쓴다. 
        a = a.concat(c);
      }
    }
    let d = [...new Set(a)];
    //-> concat();으로 축적 & 변화된 배열 a 중 중복된 요소를 제거해준다. key에 3월이 두 개라서 '2022년 3월'이라는 요소가 배열에 두 번 포함되어버리니까. 
    for(i = 0; i < d.length; i++){
      document.write(d[i]);
    }
  };

/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/

function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);