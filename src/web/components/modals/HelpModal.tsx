export default function HelpModal({
  isOpen,
  setIsModalOpen,
}: {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className={isOpen ? "helpModal open" : "helpModal"}>
        <div className="helpModalWrap">
          <div className="helpHeader">
            <h2 className="helpTitle">Code Stock</h2>
            <p className="helpVersion">
              version <>1.0.0</>
            </p>
          </div>

          <p className="helpDescription">
            よく使うコードスニペットを言語・タグで分類して保管できる、
            デスクトップ製のコードストックアプリです。
          </p>

          <section className="helpSection">
            <h3 className="helpSectionTitle">基本的な使い方</h3>
            <ul className="helpList">
              <li className="helpListItem">
                <span className="helpListLabel">スニペットの追加</span>
                <span className="helpListText">
                  サイドバーの「+ 新しいコード」から、コードを登録できます。
                </span>
              </li>
              <li className="helpListItem">
                <span className="helpListLabel">検索</span>
                <span className="helpListText">
                  上部の検索バーから、タイトル・コード本文を全文検索できます。
                </span>
              </li>
              <li className="helpListItem">
                <span className="helpListLabel">絞り込み</span>
                <span className="helpListText">
                  サイドバーの言語・タグをクリックすると、該当するスニペットだけを表示します。
                </span>
              </li>
              <li className="helpListItem">
                <span className="helpListLabel">表示の切り替え</span>
                <span className="helpListText">
                  検索バー左のボタンで、グリッド表示とリスト表示を切り替えられます。
                </span>
              </li>
              <li className="helpListItem">
                <span className="helpListLabel">コピー</span>
                <span className="helpListText">
                  各カードの「COPY」ボタンで、コードをクリップボードにコピーします。
                </span>
              </li>
              <li className="helpListItem">
                <span className="helpListLabel">編集・削除</span>
                <span className="helpListText">
                  カードの編集・削除ボタン、または詳細表示から操作できます。
                </span>
              </li>
            </ul>
          </section>

          <section className="helpSection">
            <h3 className="helpSectionTitle">メニュー機能</h3>
            <ul className="helpList">
              <li className="helpListItem">
                <span className="helpListLabel">File</span>
                <span className="helpListText">
                  登録したスニペットを JSON ファイルにエクスポートできます。
                </span>
              </li>
              <li className="helpListItem">
                <span className="helpListLabel">Settings</span>
                <span className="helpListText">
                  シンタックスハイライトのテーマを変更できます。設定は次回起動時も保持されます。
                </span>
              </li>
            </ul>
          </section>

          <section className="helpSection">
            <h3 className="helpSectionTitle">データの保存について</h3>
            <p className="helpSectionText">
              スニペットはお使いの PC 内のローカルデータベースに保存されます。
              外部サーバーには送信されず、オフラインで利用できます。
            </p>
          </section>

          <footer className="helpFooter">
            <p className="helpFooterText">開発: 岡本 匠 (Takumi Okamoto)</p>
            <a
              className="helpLink"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub リポジトリ
            </a>
          </footer>

          <button
            className="helpCloseButton"
            onClick={() => {
              /* モーダルを閉じる処理 */
              setIsModalOpen(false);
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}
