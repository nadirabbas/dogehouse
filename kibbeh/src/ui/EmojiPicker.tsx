import React, { useEffect, useState } from "react";
import { useEmojiPickerStore } from "../global-stores/useEmojiPickerStore";
import { CustomEmote } from "../modules/room/chat/EmoteData";
import { useRoomChatStore } from "../modules/room/chat/useRoomChatStore";
interface EmojiPickerProps {
  emojiSet: CustomEmote[];
  onEmojiSelect: (emoji: CustomEmote) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  emojiSet,
  onEmojiSelect,
}) => {
  const { message } = useRoomChatStore();
  const {
    open,
    setOpen,
    setQueryMatches,
    queryMatches,
    keyboardHoveredEmoji,
    setKeyboardHoveredEmoji,
    setQuery,
  } = useEmojiPickerStore();

  // Open picker on colon syntax
  useEffect(() => {
    // colon syntax regex
    const colonSyntaxMatches = message.match(/^(?!.*\bRT\b)(?:.+\s)?:\w+$/i);

    if (colonSyntaxMatches) {
      const emojiQueries = colonSyntaxMatches[0].split(" ");
      const query = emojiQueries[emojiQueries.length - 1].toLowerCase();
      const queryMatches = emojiSet
        .filter(
          (e) =>
            e.keywords
              .map((k) => k.toLowerCase())
              .filter((k) => k.includes(query.replace(":", ""))).length
        )
        .slice(0, 7);

      setQueryMatches(queryMatches);
      setKeyboardHoveredEmoji(
        queryMatches.length ? queryMatches[0].name : null
      );
      setOpen(!!queryMatches.length);
      setQuery(query);
    } else {
      // Close picker if no matches
      setQueryMatches([]);
      setOpen(false);
    }
  }, [message]);

  if (!open) return null;

  return (
    <div
      className={`bg-primary-700 rounded-8 flex flex-row flex-grow p-1 max-h-24 pt-2 px-2`}
    >
      <div
        className={`grid grid-cols-7 pr-3 gap-2 max-h-16 overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-primary-800`}
      >
        {(queryMatches.length ? queryMatches : emojiSet).map((emoji) => (
          <img
            key={emoji.name}
            src={emoji.imageUrl}
            className={`w-5 max-w-5 cursor-pointer ${
              keyboardHoveredEmoji === emoji.name
                ? "bg-primary-300 rounded p-1"
                : ""
            }`}
            onClick={() => onEmojiSelect(emoji)}
          />
        ))}
      </div>
    </div>
  );
};