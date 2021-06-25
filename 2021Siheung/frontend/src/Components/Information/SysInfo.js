import React from 'react';

const SysInfo = () => {
  return (
    <div className="subContBox">
      <div className="subIntroMinWidth">
        <div className="SystemIntroContWrap">
          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 스마트 안개 관제 서비스란?</h2>
            <p className="IntroTxt">
              안개 탐지/예측을 위한 다양한 기법의 인공지능을 적용하여 정확도
              높은 안개 탐지/예측 데이터를 생산합니다.
            </p>
          </div>
          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 왜 서비스가 필요한가?</h2>
            <div className="row col-12 col-md-6 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/Intro1Icon01.png" alt="안개 사고 그림" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">안개 사고의 예방</h3>
                  <p className="IntroTxt">
                    안갯길 사고 사망률은 눈길∙빗길의 3배 이상으로 선제적 대응
                    방안 필요
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-12 col-md-6 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/Intro1Icon02.png" alt="국지성 안개" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">안개의 국지성</h3>
                  <p className="IntroTxt">
                    고가의 시정센서로는 촘촘한 관측망 구축이 어려워 안개 탐지의
                    한계 발생
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-12 col-md-6 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/Intro1Icon03.png" alt="IoT·AI 기술 확대" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">IoT·AI 기술 확대</h3>
                  <p className="IntroTxt">
                    최근 환경·기상 산업에서도 IoT·AI 기술을 활용한 서비스 증가
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 스마트 안개 관제 서비스를 활용하면 !</h2>
            <div className="row col-12 col-md-6 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/Intro1Icon04.png" alt="안개 모니터링" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">
                    도로 교통 안개 모니터링 체계 강화
                  </h3>
                  <p className="IntroTxt">
                    다중 충돌사고를 유발시키는 위험한 안개 속 도로 교통사고
                    <br />
                    <span>촘촘한 안개 모니터링을 통한 사전 예방</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-12 col-md-6 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img
                  src="/img/sub/Intro1Icon05.png"
                  alt="해양 교통 안전 강화"
                />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">해양 교통 안전 체계 강화</h3>
                  <p className="IntroTxt">
                    선박 충돌, 좌초, 갯벌 고립 , 낚시사고 등 해상사고의 큰
                    비율을 차지하는 해무
                    <br />
                    <span>정확한 해무 정보로 해상 선박사고 저감</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-12 col-md-6 col-xl-4">
              <div className="IntroIconBoxWrap">
                <img src="/img/sub/Intro1Icon06.png" alt="맞춤형 정보 제공" />
                <div className="IntroIconBoxTxt">
                  <h3 className="IntroBlueTit">
                    맞춤형 안개 탐지·예측 정보를 더 많은 수요자에게 제공
                  </h3>
                  <p className="IntroTxt">
                    안개 탐지·예측 정보 제공을 통한 안전한 레저 및 여가 활동
                    계획
                    <br />
                    <span>국민의 안전과 삶의 질 향상</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="row col-md-12 col-xl-12">
              <h2 className="IntroTit">
                · 인공지능 기반으로 보다 정확한 안개 탐지 및 안개 예측 정보 생산
              </h2>
              <p className="IntroTxt">
                도로, 항만, 레저 등 다양한 활동에서 안개 사고를 예방하기 위해
                IoT 센서와 AI 기술로 생산한 안개 탐지·예측 정보를 제공·관리하는
                서비스입니다.
              </p>
              <div className="col-md-12 col-xl-6 blueBox">
                <h3 className="IntroBlueTit">안개 탐지/예측 프로세스</h3>
                <img
                  src="/img/sub/IntroBlueBoxText01.png"
                  alt="안개 탐지/예측 프로세스"
                />
              </div>
              <div className="col-md-12 col-xl-6 blueBox">
                <h3 className="IntroBlueTit">안개 탐지/예측 기술</h3>
                <img
                  src="/img/sub/IntroBlueBoxText02.png"
                  alt="안개 탐지/예측 기술"
                />
              </div>
            </div>
          </div>
        </div>
        {/* SystemIntroContWrap */}
        <div className="SystemIntroContWrap">
          <div className="row col-md-12 col-xl-12">
            <h2 className="IntroTit">
              · IoT센서를 활용한 촘촘한 안개 관측망 구축
            </h2>
            <p className="IntroTxt">
              IoT 기반 저가형 광산란 센서로 촘촘한 관측망을 구축하여 국지적인
              기상 환경 정보를 측정합니다.
            </p>
          </div>
          <div className="IoTWrap">
            <div className="IotGroup01">
              <h3 className="IntroBlueTit mt-3">IoT 광산란 센서</h3>
              <p className="IntroTxt mt-1">
                · 작은 크기에 무선통신 기능이 탑재되어 전력공급이가능하며 어느
                곳이든 설치 가능
                <br />
                · 온∙습도, 기압, 미세먼지, 강수 유무 등 안개 탐지를 위한추가적인
                기상 환경 데이터 수집
                <br />· 기존 시정 센서 대비 20% 이하 수준의 가격경쟁력
              </p>
            </div>
            <div className="IotGroup02">
              <h3 className="IntroBlueTit mt-3">관측망 구축</h3>
              <p className="IntroTxt mt-1">
                · 시범 지역에 IoT 기반 저가형 광산란센서를 설치하여 안개 관측망
                구축
              </p>
              <img src="/img/sub/IntroTechIMG01.png" alt="관측망 이미지" />
            </div>

            <div className="IotGroup03">
              <h3 className="IntroBlueTit">센서 설치 사례</h3>
              <img src="/img/sub/IntroTechIMG02.png" alt="센서 설치 이미지" />
            </div>
          </div>
          <div className="clearBoth"></div>
        </div>
        {/* SystemIntroContWrap */}
        <div className="SystemIntroContWrap">
          <div className="fogIMG row col-md-12 col-xl-12">
            <h2 className="IntroTit">· 안개 탐지 예시 사진</h2>
            <div className=" col-12 col-md-6 col-xl-4">
              <h3 className="IntroBlueTit">안개 없음</h3>
              <img src="/img/sub/introFogIMG01.jpg" alt="안개 없음" />
            </div>
            <div className=" col-12 col-md-6 col-xl-4">
              <h3 className="IntroBlueTit">옅은 안개</h3>
              <img src="/img/sub/introFogIMG02.jpg" alt="옅은 안개" />
            </div>
            <div className=" col-12 col-md-6 col-xl-4">
              <h3 className="IntroBlueTit">짙은 안개</h3>
              <img src="/img/sub/introFogIMG03.jpg" alt="짙은 안개" />
            </div>
          </div>
        </div>
        {/* SystemIntroContWrap */}
      </div>
    </div>
  );
};

export default SysInfo;
