import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;
  if (req.method === "GET") {
    await delay(1000);
    const articles = fs.readFileSync("articles.json", "utf8");
    const article = JSON.parse(articles).articles.find(
      (a: any) => a.slug === slug
    );
    if (!article) {
      res.status(404).end();
    }

    res.status(200).json(article);
  } else if (req.method === "PUT") {
    delay(1000);
    const { title, content } = req.body;
    const articles = JSON.parse(fs.readFileSync("articles.json", "utf8"));
    const article = articles.find((a: any) => a.slug === slug);
    if (!article) {
      res.status(404).end();
    }
    article.title = title;
    article.content = content;
    article.updatedAt = new Date();
    fs.writeFileSync("articles.json", JSON.stringify(articles));
    res.status(200).json(article);
  }
}
