// Copyright 2024 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import "./index.css";
import "./styles.css";
import React, { useEffect } from "react";
import { TopBar } from "./TopBar";
import { Content } from "./Content.js";
import { SideControls } from "./SideControls";
import { Prompt } from "./Prompt";
import { ExtraModeControls } from "./ExtraModeControls";
import { useAtom } from "jotai";
import {
  BumpSessionAtom,
  ImageSrcAtom,
  InitFinishedAtom,
  IsUploadedImageAtom,
} from "./atoms.js";
import { useResetState } from "./hooks.js";
import { DetectTypeSelector } from "./DetectTypeSelector.js";
import { safetySettings } from "./consts.js";

function Spatial() {
  const [, setImageSrc] = useAtom(ImageSrcAtom);
  const resetState = useResetState();
  const [initFinished, setInitFinished] = useAtom(InitFinishedAtom);
  const [, setBumpSession] = useAtom(BumpSessionAtom);
  const [, setIsUploadedImage] = useAtom(IsUploadedImageAtom);

  useEffect(() => {
    if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex grow flex-col border-b overflow-hidden">
        <TopBar />
        {initFinished ? <Content /> : null}
        <ExtraModeControls />
      </div>
      <div className="flex shrink-0 w-full overflow-auto py-6 px-5 gap-6 lg:items-start">
        <div className="flex flex-col lg:flex-col gap-6 items-center border-r pr-5">
          <SideControls />
        </div>
        <div className="flex flex-row gap-6 grow">
          <DetectTypeSelector />
          <Prompt />
        </div>
      </div>
    </div>
  );
}

export default Spatial;
