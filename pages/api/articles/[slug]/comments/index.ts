import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug;
  if (req.method === "GET") {
    await delay(3000);
    const comments = fs.readFileSync("comments.json", "utf8");
    const articles = fs.readFileSync("articles.json", "utf8");
    const articleId = JSON.parse(articles).articles.find(
      (a: any) => a.slug === slug
    ).id;
    const comment = JSON.parse(comments).comments.filter(
      (c: any) => c.articleId === articleId
    );
    res.status(200).json(comment);
  }
}
