"use client";
import "@styles/home.scss";
import "@styles/global.scss";
import "@styles/center.scss";
import SubTitle from "@/components/SubTitle";
import Down from "@/components/Down";
import { timeAixsList } from "@/utils/dict";
import Typed from "typed.js";
import Image from "next/image";
import bgImgLight from "@public/xia1.jpg";
import Link from "next/link";
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
        <SubTitle title="Rebecca FangYan" desc="更多商品" />
        <div className="project_btn">
          <div className="project_btn_box">
          <Image
          className="project_btn_bgbox"
              width={2000}
              height={1320}
              src={
                "https://api-render.wp-boke.work/picture/daily-bing?is_redirect=true"
              }
              alt="必应每日壁纸"
              priority={true}
            />
            <Link className="project_link" href="/news">
              热 点
            </Link>
          </div>
          <div className="project_btn_box">
          <Image
          className="project_btn_bgbox"
              width={2000}
              height={1320}
              src={
                "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg"
              }
              alt="热点"
              priority={true}
            />
              <Link className="project_link" href="/news">
              热 点
            </Link>
          </div>
        </div>
      </div>
      <div className="timeAixs_box">
        <SubTitle title="Rebecca FangYan" desc="更多商品" />
        {/* <div className={styles.timeAixs}>
          <div className={styles.timeAixs_content}>
            {timeAixsList?.map((v) => (
              <div className={styles.timeAixs_item} key={v.id}>
                <div className={styles.timeAixs_item_time}>{v.time}</div>
                <div className={styles.timeAixs_item_title}>{v.title}</div>
              </div>
            ))}
            <div className={styles.timeAixs_item}>
              <div className={styles.timeAixs_item_desc}>GROWING...</div>
              <div className={styles.timeAixs_item_desc}>COMING SOON</div>
            </div>
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default Home;
