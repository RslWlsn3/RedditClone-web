import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import { useRouter } from 'next/router'
import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql";
import { pipe, tap } from "wonka";
import {
  LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

//Any time there is an error with anything we run it will come here
const errorExchange: Exchange = ({ forward }) => (ops$) => {
  const router = useRouter()
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        router.replace("/login");
      }
    })
  );
};

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    console.log("allFields ", allFields)

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    // const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    // const isItInTheCache = cache.resolve(
    //   cache.resolveFieldByKey(entityKey, fieldKey) as string,
    //   "posts"
    // );
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string[];
      console.log("key ", key)
      results.push(...key)
    });

    console.log("results ", results)
    return results;

  };
};


export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          posts: cursorPagination(),
        }
      },
      updates: {
        Mutation: {
          logout: (_result: any, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          //update cache (specifically the me query) whenever our login mutation runs
          login: (_result: any, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else if (result.login.user) {
                  return {
                    me: result.login.user,
                  } as MeQuery;
                } else {
                  alert("somthing went wrong");
                  return query;
                }
              }
            );
          },
          //update cache (specifically the me query) whenever our register mutation runs
          register: (_result: any, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  } as MeQuery;
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
