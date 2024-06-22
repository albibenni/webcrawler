import {test, expect} from "@jest/globals";
import { normalizeURL } from "./crawl";

test("normalize http url", () => {
    const url = "http://mywebsite.com/path";
    expect(normalizeURL(url)).toEqual("mywebsite.com/path");
});

test("normalize https url", () => {
    const url = "https://mywebsite.com/path";
    expect(normalizeURL(url)).toEqual("mywebsite.com/path");
});
test("normalize http/ url", () => {
    const url = "http://mywebsite.com/path/";
    expect(normalizeURL(url)).toEqual("mywebsite.com/path");
});
test("normalize https/ url", () => {
    const url = "https://mywebsite.com/path/";
    expect(normalizeURL(url)).toEqual("mywebsite.com/path");
});
