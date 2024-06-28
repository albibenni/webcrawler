import {test, expect} from "@jest/globals";
import { normalizeURL, getURLsFromHTML} from "./crawl";

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

test('normalizeURL capitals', () => {
  const input = 'https://MYWEBSITE.me.com/path'
  const actual = normalizeURL(input)
  const expected = 'mywebsite.me.com/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://MYWEBSITE.me.com/path'
  const actual = normalizeURL(input)
  const expected = 'mywebsite.me.com/path'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://mywebsite.me.com'
  const inputBody = '<html><body><a href="https://mywebsite.me.com"><span>meme.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://mywebsite.me.com/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://mywebsite.me.com'
  const inputBody = '<html><body><a href="/path/one"><span>me.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://mywebsite.me.com/path/one' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://mywebsite.me.com'
  const inputBody = '<html><body><a href="/path/one"><span>my website ></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://mywebsite.me.com/path/one', 'https://other.com/path/one' ]
  expect(actual).toEqual(expected)
})
