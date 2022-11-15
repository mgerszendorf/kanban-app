import { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

type EmojiProps = {
  icon: string;
  onIconChange: (newIcon: string) => Promise<void>;
};

const Emoji = (props: EmojiProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const selectEmoji = (e: any) => {
    const sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((element: string) => codesArray.push("0x" + element));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onIconChange(emoji);
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);
  return (
    <>
      <p className="emoji" onClick={showPicker}>
        {selectedEmoji}
      </p>
      <div
        style={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "99",
        }}
      >
        <Picker
          data={data}
          onEmojiSelect={selectEmoji}
          theme="dark"
          showPreview={false}
        />
      </div>
    </>
  );
};

export default Emoji;
