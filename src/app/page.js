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
import { useEffect, useRef, useState } from "react";
import axios from "@/utils/axios";
const Home = () => {

  const typeTarget = useRef(null);
  const [img, setImg] = useState([]);

  const recordVisit = async () => {
    try {
      const result = await axios.post('/api/tracking', {
        pageUrl: window.location.href,
        referrer: document.referrer,
        duration: 888
      });
      console.log('Visit recorded:', result.data);
    } catch (e) {
      console.error('Failed to record visit:', e);
    }
  }

  const loadBanners = async () => {
    try {
      const response = await axios.get('/api/banners');
      const baseURL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
      const bannerUrls = response.data.data.map(item => {
        // 如果URL已经是完整URL，直接返回；否则拼接baseURL
        if (item.url.startsWith('http://') || item.url.startsWith('https://')) {
          return item.url;
        }
        return `${baseURL}${item.url}`;
      });
      setImg(bannerUrls);
      console.log('Banners loaded:', bannerUrls);
    } catch (e) {
      console.error('Failed to load banners:', e);
    }
  }

  useEffect(() => {
    recordVisit();
    loadBanners();

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
              src={bgImgLight}
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
              src={bgImgLight}
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
        <div className="timeAixs">
        <div className="timeAixs_content">
          {timeAixsList?.map((v) => (
            <div className="timeAixs_item" key={v.id}>
              <div className="timeAixs_item_time">{v.time}</div>
              <div className="timeAixs_item_title">{v.title}</div>
            </div>
          ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Home;
