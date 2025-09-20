// Banner工具函数

/**
 * 根据文件名生成banner图片的访问路径
 * @param {string} fileName - 图片文件名
 * @returns {string} - 图片访问路径
 */
export const getBannerUrl = (fileName) => {
  return `/banners/${encodeURIComponent(fileName)}`;
};

/**
 * 处理banner数据，为每个banner添加url字段
 * @param {Array} banners - banner数据数组
 * @returns {Array} - 处理后的banner数组
 */
export const processBanners = (banners) => {
  return banners.map(banner => ({
    ...banner,
    url: banner.url || getBannerUrl(banner.fileName)
  }));
};

/**
 * 获取banner图片的完整信息
 * @param {Array} banners - banner数据数组
 * @returns {Array} - 包含url的完整banner信息
 */
export const getBannerImages = (banners) => {
  return banners.map(banner => ({
    id: banner._id || banner.id,
    fileName: banner.fileName,
    title: banner.title,
    description: banner.description,
    category: banner.category,
    sortOrder: banner.sortOrder,
    url: banner.url || getBannerUrl(banner.fileName)
  }));
};
