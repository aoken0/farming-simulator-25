"use client";
import ContentTitle from "@/components/ContentTitle";
import GlobalWrapper from "@/components/GlobalWrapper"
import MenuTable from "@/components/MenuTable";

const ReverseProduction = () => {
  return (
    <GlobalWrapper>
      <ContentTitle>材料逆引きツール</ContentTitle>
      <MenuTable>
        <tr>
            <th>難易度</th>
            <td>
              <select name="difficulty" id="difficulty" defaultValue={"normal"}>
                <option value="easy">イージー</option>
                <option value="normal">ノーマル</option>
                <option value="hard">ハード</option>
              </select>
            </td>
          </tr>
      </MenuTable>
    </GlobalWrapper>
  )
}

export default ReverseProduction