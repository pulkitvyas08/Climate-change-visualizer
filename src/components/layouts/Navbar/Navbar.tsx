import React, { useEffect } from 'react';
import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import DarkModeToggle from "react-dark-mode-toggle";
import { useRecoilState } from 'recoil';

import { darkThemeSelectedState } from '@src/store/DarkThemeSelectedState';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDarkModeActive, setIsDarkModeActive] = useRecoilState(darkThemeSelectedState);
  useEffect(() => {
    toggleColorMode();
  }, [isDarkModeActive]);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Climate Change Visualizer</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <DarkModeToggle
                onChange={setIsDarkModeActive}
                checked={isDarkModeActive}
                size={80}
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
