"use client";
import "@styles/home.scss";
import "@styles/global.scss";
import "@styles/center.scss";
import Title from "@/components/Title";
import Down from "@/components/Down";
// import Article from "@/components/Article";
// import Profile from "@/components/Profile";
// import "@/styles/bottom.scss";
import Image from "next/image";
import bgImgLight from "@public/xia1.jpg";
const Home = () => {
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
      {/* <div className={bg_mask} id="bg_mask" />
      <div className={bg_content}>
        <div className={title}>世人万千，再难遇我</div>
        <div className={description_box}>
          <div className={description} ref={typeTarget} />
        </div>
        <Down />
      </div> */}
      {/* <div className={project_box} ref={aboutDom}>
        <div className={project_title}>BLOG GROWTH RECORD</div>
        <div className={project_desc}>更多的作品</div>
        <div className={project}></div>
      </div> */}
      {/* <div className={page_box} ref={aboutDom}>
        <div className={page_title}>GROWTH ABILITY</div>
        <div className={page_desc}>博客项目更多功能入口</div>
        <div className={page_list}>
          <div className={page_item}>
            <Image
              className={page_item_bg}
              width={2000}
              height={1320}
              src={
                "https://api-render.wp-boke.work/picture/daily-bing?is_redirect=true"
              }
              alt="必应每日壁纸"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={page_item_link} href="/wallpaper">
              壁 纸
            </Link>
          </div>
          <div className={page_item}>
            <Image
              className={page_item_bg}
              width={2000}
              height={1320}
              src={
                "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg"
              }
              alt="热点"
              placeholder="blur"
              blurDataURL={loadingImag}
              priority={true}
            />
            <Link className={page_item_link} href="/news">
              热 点
            </Link>
          </div>
        </div>
      </div>
      <div className={timeAixs_box}>
        <div className={timeAixs_title}>GROWTH RECORD</div>
        <div className={timeAixs_desc}>「 左右滑动查看 」</div>
        <div className={timeAixs}>
          <div className={timeAixs_left} />
          <div className={timeAixs_content}>
            {timeAixsList?.map((v) => (
              <div className={timeAixs_item} key={v.id}>
                <div className={timeAixs_item_time}>{v.time}</div>
                <div className={timeAixs_item_title}>{v.title}</div>
              </div>
            ))}
            <div className={timeAixs_item}>
              <div className={timeAixs_item_desc}>GROWING...</div>
              <div className={timeAixs_item_desc}>COMING SOON</div>
            </div>
          </div>
          <div className={timeAixs_right} />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
