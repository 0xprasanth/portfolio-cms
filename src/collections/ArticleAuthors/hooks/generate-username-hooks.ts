import {  ArticleAuthor } from "@/payload-types"
import { FieldHook } from "payload"

function slugify(str: string) {
    return String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '_') // replace spaces with underscore
      .replace(/_+/g, '_') // remove consecutive underscores
      .replace(/^_+|_+$/g, ''); // remove leading and trailing underscores
  }
  

export const generateUsernameHook: FieldHook<ArticleAuthor, string> = ({ value, data }) => {
    if (value) return slugify(value.trim()) || ''
    return slugify(data?.name?.trim() || '') || ''
}