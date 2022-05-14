import { FeildError } from "../generated/graphql";

export const toErrorMap = (errors: FeildError[]) => {
const errorMap: Record<string,string> ={};
errors.forEach(({field, message}) => {
    errorMap[field] = message;
})
console.log(errorMap);
return errorMap;
}