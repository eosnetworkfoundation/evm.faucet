'use client';
import { Menu, MenuButton, Button, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { CHAINS } from "../../api/constants";
import { useRecoilValue } from 'recoil';
import { chainState } from "../../atoms";
import "./Footer.scss";
import Chain from "./Chain";

export default function Footer() {
  const currentChain = useRecoilValue(chainState);

  return (
    <footer className="footer">
      <div className="footer-background"></div>
      <div className="footer-content contained">
        <div className="flex">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Testnet: {currentChain}
          </MenuButton>
          <MenuList>
            {Object.keys(CHAINS).map((chain) => {
              return (
                <Chain key={chain} chain={chain} />
              );
            })}
          </MenuList>
        </Menu>
        </div>
      </div>
    </footer>
  );
}