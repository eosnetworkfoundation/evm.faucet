'use client';
import { useEffect } from "react";
import { MenuItem} from "@chakra-ui/react";
import { useSetRecoilState } from 'recoil';
import { chainState } from "../../atoms";
import "./Footer.scss";

export default function Chain(props: { chain: string }) {
  const setChain = useSetRecoilState(chainState);

  useEffect(() => {
    const chain = localStorage.getItem('chain');
    if (chain) setChain(chain);
  }, []);

  const onClick = () => {
    setChain(props.chain);
    localStorage.setItem('chain', props.chain);
  }

  return (
    <MenuItem onClick={onClick}>
        {props.chain}
    </MenuItem>
  );
}