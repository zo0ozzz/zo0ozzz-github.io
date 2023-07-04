export function HTMLRenderer({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
