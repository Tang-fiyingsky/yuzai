import fs from "node:fs/promises";
import path from "node:path";

const checkedAt = "2026-07-12";
const outputDir = path.resolve("public/images/attractions");

const targets = [
  ["hongyadong", "Hongyadong Chongqing"],
  ["jiefangbei", "Jiefangbei Chongqing"],
  ["liziba", "Liziba station Chongqing"],
  ["qiansimen", "Qiansimen Bridge Chongqing"],
  ["airport", "Chongqing Jiangbei International Airport terminal"],
  ["elingpark", "Eling Park Chongqing"],
  ["nanbinroad", "Nanbin Road Chongqing"],
  ["cableway-south", "Chongqing Yangtze River Cableway"],
  ["cableway-north", "Chongqing Yangtze River Cableway"],
  ["longmenhao", "Longmenhao Chongqing"],
  ["shibati", "Shibati Chongqing"],
  ["guanyinqiao", "Guanyinqiao Chongqing"],
  ["beicang", "Beicang Chongqing"],
  ["taping", "Taping Chongqing"],
  ["eling2", "Eling Factory Chongqing"],
  ["xiahaoli", "Xiahaoli Chongqing"]
];

const pickValue = (item, key) => item?.extmetadata?.[key]?.value?.replace(/<[^>]+>/g, "") ?? "详见原始文件页";

async function searchCommons(term) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: term,
    gsrnamespace: "6",
    gsrlimit: "6",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1200",
    format: "json",
    origin: "*"
  }).toString();
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  const pages = Object.values(data.query?.pages ?? {});
  return pages
    .sort((a, b) => (a.index ?? 99) - (b.index ?? 99))
    .find((page) => page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url);
}

async function download(url, filePath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  return buffer.byteLength;
}

await fs.mkdir(outputDir, { recursive: true });
const report = [];

for (const [id, term] of targets) {
  try {
    const page = await searchCommons(term);
    if (!page) {
      report.push({ id, term, status: "missing" });
      continue;
    }
    const info = page.imageinfo[0];
    const url = info.thumburl ?? info.url;
    const ext = url.includes(".png") ? "png" : "jpg";
    const localPath = `/images/attractions/${id}.${ext}`;
    const bytes = await download(url, path.join(outputDir, `${id}.${ext}`));
    report.push({
      attractionId: id,
      localPath,
      sourceName: "Wikimedia Commons",
      sourceUrl: info.descriptionurl,
      title: page.title,
      author: pickValue(info, "Artist"),
      license: pickValue(info, "LicenseShortName"),
      checkedAt,
      bytes,
      status: "confirmed"
    });
  } catch (error) {
    report.push({ id, term, status: "error", error: error.message });
  }
}

await fs.writeFile("image-fetch-report.json", JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify(report, null, 2));
