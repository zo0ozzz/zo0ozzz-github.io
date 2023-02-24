const 전체글 = {
  ['+20221220'] : {
    코딩 : ['기록을 시작하며', '신기루 프로젝트', '신기루1 블로그 만들기'],
  },
};

const Categories = ['코딩',];

const 모든글 = array_allpost();
const 코딩 = array_byCategory('코딩');

const title = document.querySelector('title');
const h_blogName = document.querySelector('.h_blogName');
const allPostPage = document.querySelector('.allPostPage');
const section_sidebar = document.querySelector('.section_sidebar');
section_sidebar.innerHTML = 
'<div class="s_s_byCategory_subject"></div>'+
'<br>'+
'<div class="s_s_allPostBtn"></div>'+
'<div class="s_s_byCategory_listBtn"></div>'+
'<br><br><br>'+
'<div class="s_s_byDate_subject"></div>'+
'<br>'+
'<div class="s_s_byDate_listBtn"></div>'
const s_s_byCategory_subject = document.querySelector('.s_s_byCategory_subject');
const s_s_allPostBtn = document.querySelector('.s_s_allPostBtn');
const s_s_byCategory_listBtn = document.querySelector('.s_s_byCategory_listBtn');
const s_s_byDate_subject = document.querySelector('.s_s_byDate_subject');
const s_s_byDate_listBtn = document.querySelector('.s_s_byDate_listBtn');

// ??? 이름
title.innerHTML = 'zo0ozzz'

// 블로그 이름
h_blogName.innerHTML = "zo0ozzz"

// 모든 글 페이지
if(allPostPage !== null){
  allPostPage.innerHTML = array_s_b_allPostPage().join('');
}

// 카테고리1 페이지
const category1Page = document.querySelector('.category1Page');

if(category1Page !== null){
  category1Page.innerHTML = array_s_b_category1Page('코딩').join('');
};

// 월별 게시물 페이지
const datePage2212 = document.querySelector('.datePage2212');

if(datePage2212 !== null){
  datePage2212.innerHTML = array_s_b_YearMonthPage(2022, 12).join('');
};

// 사이드바_분류 기준1
s_s_byCategory_subject.innerHTML = "카테고리별"

// 사이드바_모든 글 버튼
s_s_allPostBtn.innerHTML = '<a href = "모든 글.html" style = "margin-bottom: 5px; display: inline-block">모든 글</a><span style = "font-size: 10px"> (' + array_allpost().length + ')</span><br>';

// 사이드바_카테고리 리스트 버튼
s_s_byCategory_listBtn.innerHTML = array_s_s_byCategory_listBtn().join('');

// 사이드바_분류 기준2
s_s_byDate_subject.innerHTML = "월별";

// 사이드바_월별 리스트 버튼
s_s_byDate_listBtn.innerHTML = array_s_s_byYearMonth_listBtn().join('');

// <모든 콘텐츠 모음 배열 제작 함수>
function array_allpost(){
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
function array_byCategory(CategoryName){
  let a = [];
  for(let key in 전체글){
    if(전체글[key][CategoryName] !== undefined){
    a = a.concat(전체글[key][CategoryName])
    }
  }
    return a;
};

// <한 달 단위 콘텐츠 배열 제작 함수>
function array_byYearMonth(연, 월){
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

// <@본문_모든 콘텐츠 목록화 함수>
function array_s_b_allPostPage(){
  let a = [];
  for(let key in 전체글){
    //-> 모든 발행일에 대해 반복
    for(i = 0; i < Categories.length; i++){
      //-> 그리고 모든 카테고리에 대해 또 반복
      if(전체글[key][Categories[i]] !== undefined){
        for(j = 0; j < 전체글[key][Categories[i]].length; j++){
          a.push('<p id = "Posts" style = "display: inline"><span style = "font-style: italic; font-family: D2coding;">' + Slicer2(key, 3, 2) + '/' + Slicer2(key, 5, 2) + '/' + Slicer2(key, 7, 2) + '</span>&nbsp;&nbsp;&nbsp;<a href="' + 전체글[key][Categories[i]][j] + '.html">' + 전체글[key][Categories[i]][j] + '</a><br></p>')
        }
      }
    }
  }
  return a;
}

// <@본문_카테고리별 콘텐츠 목록화 함수>
function array_s_b_category1Page(CategoryName){
  let a = [];
  for(let key in 전체글){
    if(전체글[key][CategoryName] !== undefined){
      for(i = 0; i < 전체글[key][CategoryName].length; i++){
        a.push('<span style = "font-style: italic; font-family: D2coding;">' + Slicer2(key, 3, 2) + '/' + Slicer2(key, 5, 2) + '/' + Slicer2(key, 7, 2) + '</span>&nbsp;&nbsp;&nbsp;<a href="' + 전체글[key][CategoryName][i] + '.html">' + 전체글[key][CategoryName][i] + '</a><br>')
        console.log(key, i, 전체글[key][CategoryName][i])
      }
    }
  }
  return a;
}

// <@본문_연월별 콘텐츠 목록화 함수>
function array_s_b_YearMonthPage(연, 월){
  //-> '연'은 네 지리. ex) 2022. '월'은 한 자리나 두 자리 ex) 7, 12
    let a = (연.toString() + Plus0(월)) * 100;
    let b = (연.toString() + Plus0(월+1)) * 100;
    let c = [];
    for(let key in 전체글){
      if(a < key && key < b){
        for(i = 0; i < Categories.length; i++){
          if(전체글[key][Categories[i]] !== undefined){
            for(j = 0; j < 전체글[key][Categories[i]].length; j++){
              c.push('<span style = "font-style: italic; font-family: D2coding;">' + Slicer2(key, 3, 2) + '/' + Slicer2(key, 5, 2) + '/' + Slicer2(key, 7, 2) + '</span>&nbsp;&nbsp;&nbsp;<a href="' + 전체글[key][Categories[i]][j] + '.html">' + 전체글[key][Categories[i]][j] + '</a><br>')
          }
        }
      }
    }
  }
  return c;
}

function array_s_s_byCategory_listBtn(){
  const a = [];
  for(i = 0; i < Categories.length; i++){
    a.push('<a href = "' + Categories[i] + '.html">- ' + Categories[i] + '</a>' + '<span style = "font-size: 10px"> (' + array_byCategory(Categories[i]).length + ')</span><br>')
  }
  return a;
}

function array_s_s_byYearMonth_listBtn(){
  let a = [];
  for(let key in 전체글){
    //-> for in문을 사용해 특정한 형태로 가공될 key를 전달해줄 것. 
    if(Slicer(key, 5, 2) < 10){
      //-> '월'이 한 자릿수인 key를 따로 분류. key에서 잘라줄 부분의 범위가 다르니까.
      let b = '<a href = "' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 6, 1) + '월.html" style = "font-style: italic">' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 6, 1) + '월</a>' + '<span style = "font-size: 10px"> (' + array_byYearMonth(Slicer(key, 1, 4), Slicer(key, 6, 1)).length + ')</span><br>';
      //-> 7월이 07월처럼 어색하게 표시되지 않게 하려고 6index만 잘라 쓴다.
      a = a.concat(b);
    }
    else{
      //-> '월'이 두 자릿수인 key는 이쪽으로 분류된다.
      let c = '<a href = "' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 5, 2) + '월.html" style = "font-style: italic">' + Slicer(key, 1, 4) + '년 ' + Slicer(key, 5, 2) + '월</a>' + '<span style = "font-size: 10px"> (' + array_byYearMonth(Slicer(key, 1, 4), Slicer(key, 5, 2)).length + ')</span><br>';
      //-> '월' 첫 번째 자리에 '0'이 붙을 일이 없으니 5index부터 2길이만큼 잘라 쓴다. 
      a = a.concat(c);
    }
  }
  let d = [...new Set(a)];
  return d;
};

/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/

function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);

