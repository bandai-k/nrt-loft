// src/app/api/keystatic/[...params]/route.ts
// 管理画面からの読み書き（GitHub へのコミット、ログイン）を受ける。
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

export const { POST, GET } = makeRouteHandler({ config });
