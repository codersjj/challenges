function HTMLElements(str) {
  const tags = str.match(/<\/?[a-z]+>/g);  // 提取所有标签
  const stack = [];

  for (let tag of tags) {
    if (!tag.startsWith("</")) {
      // 开标签
      stack.push(tag.slice(1, -1));
    } else {
      // 闭标签
      const closeName = tag.slice(2, -1);
      const openName = stack.pop();

      if (closeName !== openName) {
        return openName; // 返回第一个出错的开标签
      }
    }
  }

  // 若有剩余未闭合标签，也是不正确
  return stack.length === 0 ? "true" : stack[0];
}


// 测试示例
console.log(HTMLElements("<div><div><b></b></div></div>"));
// 输出: "true"

console.log(HTMLElements("<div><div><b></b></div></p>"));
// 输出: "div"

console.log(HTMLElements("<div><i>hello</i>world</b>"));
// 输出: "div" (因为 <div> 应该被 </div> 关闭，而不是 </b>)

console.log(HTMLElements("<div>abc</div><p><em><i>test test test</b></em></p>"));
// 输出: "i"