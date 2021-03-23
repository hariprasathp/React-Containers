import { Router } from "express";
import { getRepository } from "typeorm";
import { Content } from "../entity/Content";

export const AppRouter = Router();

AppRouter.get("/", async (_, res) => {
  const items = (await getRepository<Content>(Content).find()) || [];
  return res.send(items);
});

AppRouter.post("/", async (req, res) => {
  const newItem = await getRepository<Content>(Content).save(
    req.body as { value: string }
  );
  return res.send(newItem);
});
