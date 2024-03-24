import { Flex, Image, Spin, Tooltip, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const Messages = ({ messageList }) => {
  const account = useSelector((state) => state.account);

  return (
    <div
      className="w-full h-[600px] px-4 py-3 flex flex-1 flex-col-reverse overflow-scroll "
      id="scrollableDiv"
    >
      {messageList?.map((msg, i) => {
        return (
          <Flex
            key={i}
            align={`${
              msg?.sender_id?._id === account?.accessToken?.id ? "end" : "start"
            }`}
            vertical
            className="mx-2"
          >
            <Flex gap={"small"} align="center">
              {msg?.sender_id?._id !== account?.accessToken?.id &&
                msg?.receiver_id?.avatar && (
                  <Image
                    src={`http://${msg?.sender_id?.avatar}`}
                    alt="avatar"
                    className="rounded-full"
                    width={30}
                    height={30}
                  />
                )}
              <Tooltip
                title={moment(msg?.createdAt).format("DD/MM/YYYY hh:mm")}
                className={`w-full flex flex-col gap-2 ${
                  msg?.sender_id?._id === account?.accessToken?.id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                {msg?.content && (
                  <Typography
                    className={`w-fit inline-block rounded-lg px-4 py-1 text-base ${
                      msg?.sender_id?._id === account?.accessToken?.id
                        ? "bg-blue-300"
                        : "bg-gray-300"
                    }`}
                  >
                    {msg?.content}
                  </Typography>
                )}
              </Tooltip>
            </Flex>
            <br />
          </Flex>
        );
      })}
    </div>
  );
};

export default Messages;
