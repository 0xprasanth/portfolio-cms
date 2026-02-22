import { Article } from "@/payload-types"
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { FieldHook } from "payload"

/**
 * Maximum length of the content summary
 * 160 is the recommended length for SEO and article cards
 */
const MAX_CONTENT_SUMMARY_LENGTH = 160;
/**
 * Generate the content summary for the article
 * @param value - The value of the content summary field
 * @param data - The data of the article
 * @returns The content summary
 */
export const generateContentSummaryHook: FieldHook<Article, string> = ({value, data}) => {
    if(value) return value.trim();
    if(!data?.content) return ""
    const text = convertLexicalToPlaintext({data: data.content}).trim();
    // if the text is less than the maximum length, return the text
    if(text.length <= MAX_CONTENT_SUMMARY_LENGTH) return text;
    // if the text is greater than the maximum length, return the text with an ellipsis
    return text.slice(0, MAX_CONTENT_SUMMARY_LENGTH - 3) + "...";
}