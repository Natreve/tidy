exports.onPreInit = () => console.log("Loaded @codesby/gatsby-transformer-text")
const isPlainText = node => {
  if (node.internal.type !== "File") return false
  if (node.internal.mediaType === "text/plain") return true
  if (
    node.internal.mediaType === "application/octet-stream" &&
    !node.internal.extension
  )
    return true
  return false
}
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  if (!isPlainText(node)) return
  const { createNode, createParentChildLink } = actions
  const content = await loadNodeContent(node)
  const id = createNodeId(`${node.id} >>> ${node.name}`)
  const textNode = {
    id,
    name: node.name,
    children: [],
    content,
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(content),
      type: "PlainText",
    },
  }
  createNode(textNode)
  createParentChildLink({
    parent: node,
    child: textNode,
  })
}
