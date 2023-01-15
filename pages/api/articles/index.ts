// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { randomUUID } from "crypto";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await delay(1500);
    const articles = JSON.parse(fs.readFileSync("articles.json", "utf8"));
    articles.articles.sort((a: any, b: any) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });
    res.status(200).json(articles);
  } else if (req.method === "POST") {
    await delay(1000);
    const { title, content } = req.body;
    const articles = JSON.parse(fs.readFileSync("articles.json", "utf8"));
    const id = articles.articles.length + 1;
    const date = new Date();
    const slug = randomUUID();
    const newArticle = {
      id,
      title,
      slug,
      content,
      createdAt: date,
      updatedAt: date,
    };
    articles.articles.push(newArticle);
    fs.writeFileSync("articles.json", JSON.stringify(articles));
    res.status(201).json(newArticle);
  } else {
    res.status(405).end();
  }
}
