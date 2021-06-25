import React from 'react';

const ApiInfo = () => {
  return (
    <div className="subContBox">
      <div className="subIntroMinWidth">
        <div className="SystemIntroContWrap">
          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 스마트 안개예측·탐지 OpenAPI</h2>
            <p className="IntroTxt big">
              <b>
                - IoT 기반의 환경데이터(온도, 습도, 미세먼지, 강수유무 등)을
                기반으로 실시간 정보 제공 및 안개탐지/예측 프로세스를 통해
                최적의 서비스를 구현할 수 있는 다양한 API를 제공합니다.
              </b>
            </p>

            <div className="row col-12 col-md-4 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/apiIcon01.png" alt="실시간 데이터 이미지" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">생활 밀착형 실시간 데이터</h3>
                  <p className="IntroTxt">
                    온도, 습도, 미세먼지, 강수유무 등 다양한 환경장비로부터
                    수집된 데이터를 활용할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-12 col-md-4 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img
                  src="/img/sub/apiIcon02.png"
                  alt="인공지능 데이터 이미지"
                />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">Intelligent Data Analytics</h3>
                  <p className="IntroTxt">
                    딥러닝 알고리즘을 이용한 안개 탐지/예측 데이터를 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-12 col-md-4 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/apiIcon03.png" alt="개발 이미지" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">손쉬운 개발</h3>
                  <p className="IntroTxt">
                    Restful기반의 인터페이스를 제공하여 보다 손쉬운 서비스
                    개발이 가능하도록 지원 합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="grayBox IntroTxt mt-5 pb-4">
              <h3 className="IntroBlueTit">·API란?</h3>
              Application Programming Interface의 약자로 응용 프로그래밍
              인터페이스를 말합니다. 다양한 응용 프로그램에 사용할 수 있는 운영
              체제, 혹은 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든
              인터페이스입니다.
            </div>
          </div>

          <div className="row col-md-12 col-xl-12 apiProcessIcon">
            <h2 className="IntroTit">· 오픈API 이용 프로세스</h2>
            <div className="apiProcessIconWeb">
              <img
                src="/img/sub/apiProcess01.png"
                alt="오픈API 이용 프로세스 이미지"
              />
            </div>
            <div className="apiProcessIconMB">
              <img
                src="/img/sub/apiProcess01Mobile.png"
                alt="오픈API 이용 프로세스 이미지(모바일)"
              />
            </div>
          </div>



          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 제공 API</h2>

            <div className="row col-12 col-md-6 col-xl-6">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/apiIcon04.png" alt="과거 관측정보 데이터 이미지" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">1. 과거 관측정보 데이터</h3>
                  <p className="IntroTxt">
                    - 관측소별 과거 관측 통계 데이터입니다.<br />
                    - 특정 기간동안의 평균온도, 평균습도, 평균 초미세먼지 농도(pm2.5)에 대하여 일별 / 월별 통계를 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-12 col-md-6 col-xl-6">
              <div className="IntroIconBoxWrap">
                <img
                  src="/img/sub/apiIcon05.png"
                  alt="과거 안개탐지 데이터이미지"
                />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">2. 과거 안개탐지 데이터</h3>
                  <p className="IntroTxt">
                    - 관측소별 과거 안개탐지데이터입니다.<br />
                    - 특정 기간동안의 10분단위 안개탐지 Raw data를 제공합니다. (최대 기간 7일)
                  </p>
                </div>
              </div>
            </div>



          </div>
        </div>
        <div className="SystemIntroContWrap">
          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 오픈API 신청 절차</h2>
            <h3 className="IntroBlueTit ml-3 mb-0">
              ·이메일 신청 (담당자 이메일: nick.lee.5002@ecoflag.co.kr )
            </h3>
            <p className="IntroTxt  ml-3">
              ① 필수 항목 작성 후 이메일 신청 <br />② 심의 후 문자 형태의 인증키
              발송
            </p>
            <p className="grayBox IntroTxt application">
              <b>· 이메일 필수 항목 양식</b> <br />
              1. 이름: <br />
              2. 소속: <br />
              3. 연락처: <br />
              4. 이메일주소:
              <br />
              5. 활용목적: ① 웹 사이트 개발 ② 앱개발(모바일, 솔루션 등) ③ 기타 ④
              참고자료 ⑤ 연구(논문 등) ⑥ 기타(기타 사항 작성)
              <br />
              6. 신청데이터 : ① 과거 관측정보 데이터 ② 과거 안개탐지 데이터 ③ 모두
              <br />
              7. 시스템 유형: ① 일반 ② 서버구축
              <br />
              - 일반: 오픈API 서비스를 호출하여 응답 받은 결과값을 서버에
              저장하지 않고 사용할 경우(서버 미구축)
              <br />
              - 서버구축: 오픈API를 호출하여 응답 받은 결과값을 서버에
              저장하거나 DB화하여 사용할 경우
              <br />
            </p>
          </div>

          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 오픈API 이용제한</h2>
            <p className="IntroTxt">
              - 상업적 이용이 불가능한 API에 대해 상업적 활용한 경우 <br />
              - 트래픽 초과로 인해 시스템에 부하가 발생할 경우
              <br />
              - 공공의 목적이 아닌 기타 개인적 혹은 불법적 목적으로 사용하는
              경우
              <br />
              - 인증키를 타인에게 양도한 경우
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiInfo;
