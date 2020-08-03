import express, { IRouter } from "express";
import asyncify from "express-asyncify";

export default function router(): IRouter {
  return asyncify(express.Router());
}
