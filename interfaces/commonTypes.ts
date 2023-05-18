import { Request } from "express"
export type RequestParams =  {}

type ResponseBody =  {}

type RequestBody =  {}

type RequestQuery =  {}

export type RequestWithQueryStringType<T> = Request<RequestParams, ResponseBody, RequestBody, T>

export type RequestWithParamsType<T> = Request<T, ResponseBody, RequestBody, RequestQuery>