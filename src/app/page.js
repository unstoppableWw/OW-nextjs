"use client";
import "@styles/home.scss";
import "@styles/global.scss";
import "@styles/center.scss";
import Title from "@/components/Title";
import Down from "@/components/Down";
// import Article from "@/components/Article";
// import Profile from "@/components/Profile";
// import "@/styles/bottom.scss";
import Typed from "typed.js";
import Image from "next/image";
import bgImgLight from "@public/xia1.jpg";
import { useEffect, useRef } from "react";
const Home = () => {

  const typeTarget = useRef(null);

  useEffect(() => {
    // bindHandleScroll();
    const typed = new Typed(typeTarget.current, {
      strings: [
        "年少时，春风得意马蹄疾，不信人间有别离。",
        "收余恨、免娇嗔、且自新、改性情、休恋逝水、苦海回身、早悟兰因。",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      loopCount: Infinity,
      autoInsertCss: false,
      backDelay: 2000,
      showCursor: false,
    });

    return () => {
      removeScroll();
      typed.destroy();
    };
  }, []);

  return (
    <div className="home">
      <div className="bg_card">
        <Image
          className="bg_card_img"
          src={bgImgLight}
          alt="blog-bg"
          priority={true}
        />
      </div>
      <div className="bg_content_box">
        <div className="bg_content">
          <div className="title">世人万千，再难遇我</div>
          <div className="description_box">
            <div className="description" ref={typeTarget} />
          </div>
          <Down />
        </div>
      </div>
      <div className="project">
        <div className="project_title">Rebecca FangYan</div>
        <div className="projecte_desc">购买入口</div>
      </div>

    </div>
  );
};

export default Home;
