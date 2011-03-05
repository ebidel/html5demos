/**
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function ImageDiffer() {
  this.lastData = null;
};
ImageDiffer.prototype.diff = function(imageData, diffData) {
  if (this.lastData != null) {
    for (var i = 0; i < imageData.data.length; i += 4) {
      if ((imageData.data[i] != this.lastData.data[i]) ||
          (imageData.data[i + 1] != this.lastData.data[i + 1]) ||
          (imageData.data[i + 2] != this.lastData.data[i + 2]) ||
          (imageData.data[i + 3] != this.lastData.data[i + 3])) {
        diffData.data[i] = 255;
        diffData.data[i + 1] = 255;
        diffData.data[i + 2] = 255;
        diffData.data[i + 3] = 255;  
      } else {
        diffData.data[i] = 0;
        diffData.data[i + 1] = 0;
        diffData.data[i + 2] = 0;
        diffData.data[i + 3] = 0;          
      }
    }
  }
  this.lastData = imageData;
  return diffData;
};

