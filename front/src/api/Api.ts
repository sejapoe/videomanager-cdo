/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProblemDetailDto {
  /** @format uri */
  type?: string;
  title?: string;
  /** @format int32 */
  status?: number;
  detail?: string;
  /** @format uri */
  instance?: string;
  properties?: Record<string, object>;
}

export interface CreateLecturerReqDto {
    name: string;
    email: string;
}

export interface CreateInstituteReqDto {
  name: string;
}

export interface DepartmentResDto {
  /** @format int64 */
  id: number;
  name: string;
}

export interface InstituteResDto {
  /** @format int64 */
  id: number;
  name: string;
  departments: DepartmentResDto[];
}

export interface CreateDepartmentReqDto {
  name: string;
  /** @format int64 */
  institute_id: number;
}

export interface LoginReqDto {
  /**
   * @minLength 1
   * @maxLength 2147483647
   * @pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$
   */
  email: string;
  /**
   * @minLength 8
   * @maxLength 2147483647
   */
  password: string;
}

export interface TokenUserResDto {
  /** @format int64 */
  id: number;
  email: string;
  fullName: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
  token: string;
}

export interface ActivateUserReqDto {
    /** @format uuid */
    uuid: string;
    password: string;
}

export interface UserResDto {
  /** @format int64 */
  id: number;
  email: string;
  fullName: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8080";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
        input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
        Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            formData.append(
                key,
                property instanceof Blob
                    ? property
                    : typeof property === "object" && property !== null
                        ? JSON.stringify(property)
                        : `${property}`,
            );
            return formData;
        }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

  public request = async <T = any, E = any>({
                                                body,
                                                secure,
                                                path,
                                                type,
                                                query,
                                                format,
                                                baseUrl,
                                                cancelToken,
                                                ...params
                                            }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
        ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
            this.securityWorker &&
            (await this.securityWorker(this.securityData))) ||
        {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? {"Content-Type": type} : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
          ? r
          : await response[responseFormat]()
              .then((data) => {
                  if (r.ok) {
                      r.data = data;
                  } else {
                      r.error = data;
                  }
                  return r;
              })
              .catch((e) => {
                  r.error = e;
                  return r;
              });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
            .join("&");
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
  }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
      /**
       * No description
       *
       * @tags user-controller
       * @name GetUser
       * @request GET:/api/user
       * @secure
       */
      getUser: (params: RequestParams = {}) =>
          this.request<UserResDto, any>({
              path: `/api/user`,
              method: "GET",
              secure: true,
              ...params,
          }),

      /**
       * No description
       *
       * @tags user-controller
       * @name CreateLecturer
       * @request POST:/api/user
       * @secure
       */
      createLecturer: (data: CreateLecturerReqDto, params: RequestParams = {}) =>
          this.request<string, any>({
              path: `/api/user`,
              method: "POST",
              body: data,
              secure: true,
              type: ContentType.Json,
              ...params,
          }),

    /**
     * No description
     *
     * @tags institute-controller
     * @name GetAllInstitutes
     * @request GET:/api/institutes
     * @secure
     */
    getAllInstitutes: (params: RequestParams = {}) =>
        this.request<InstituteResDto[], any>({
            path: `/api/institutes`,
            method: "GET",
            secure: true,
            ...params,
        }),

    /**
     * No description
     *
     * @tags institute-controller
     * @name CreateInstitute
     * @request POST:/api/institutes
     * @secure
     */
    createInstitute: (data: CreateInstituteReqDto, params: RequestParams = {}) =>
        this.request<InstituteResDto, any>({
            path: `/api/institutes`,
            method: "POST",
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        }),

    /**
     * No description
     *
     * @tags department-controller
     * @name GetAll
     * @request GET:/api/departments
     * @secure
     */
    getAll: (params: RequestParams = {}) =>
        this.request<DepartmentResDto[], any>({
            path: `/api/departments`,
            method: "GET",
            secure: true,
            ...params,
        }),

    /**
     * No description
     *
     * @tags department-controller
     * @name Create
     * @request POST:/api/departments
     * @secure
     */
    create: (data: CreateDepartmentReqDto, params: RequestParams = {}) =>
        this.request<DepartmentResDto, any>({
            path: `/api/departments`,
            method: "POST",
            body: data,
            secure: true,
            type: ContentType.Json,
            ...params,
        }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name Login
     * @request POST:/api/auth/login
     */
    login: (data: LoginReqDto, params: RequestParams = {}) =>
        this.request<TokenUserResDto, ProblemDetailDto>({
            path: `/api/auth/login`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            ...params,
        }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name CreateTestUser
     * @request POST:/api/auth/admin
     */
    createTestUser: (params: RequestParams = {}) =>
        this.request<void, ProblemDetailDto>({
            path: `/api/auth/admin`,
            method: "POST",
            ...params,
        }),

    /**
     * No description
     *
     * @tags auth-controller
     * @name Activate
     * @request POST:/api/auth/activate
     */
    activate: (data: ActivateUserReqDto, params: RequestParams = {}) =>
        this.request<TokenUserResDto, ProblemDetailDto>({
            path: `/api/auth/activate`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            ...params,
        }),
  };
}
