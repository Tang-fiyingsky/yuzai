import fs from "node:fs";
import path from "node:path";

const required = [
  "airport",
  "guanyinqiao",
  "beicang",
  "taping",
  "liziba",
  "eling2",
  "elingpark",
  "shibati",
  "jiefangbei",
  "hongyadong",
  "qiansimen",
  "longmenhao",
  "xiahaoli",
  "nanbinroad",
  "cableway-south",
  "cableway-north"
];

const missing = required.filter((id) => {
  const base = path.resolve("public/images/attractions", id);
  return ![".webp", ".jpg", ".jpeg", ".png"].some((ext) => fs.existsSync(`${base}${ext}`));
});

if (missing.length) {
  console.warn(`缺少真实图片文件：${missing.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log("所有必需景点图片文件均存在。");
}
