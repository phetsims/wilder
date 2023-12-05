/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = `data:image/svg+xml;base64,${btoa('<?xml version="1.0" encoding="UTF-8"?><svg id="a" xmlns="http://www.w3.org/2000/svg" width="56.14" height="130.11" viewBox="0 0 56.14 130.11"><defs><style>.b{fill:none;stroke:#231f20;stroke-miterlimit:10;}.c,.d,.e,.f,.g,.h{stroke-width:0px;}.d{fill:#7a7b7b;}.e{fill:#957346;}.f{fill:#e0bfa4;}.g{fill:#b3292e;}.h{fill:#fdd10b;}</style></defs><path class="g" d="m11.21,124.76c-1.16.69-2.14,1.39-4,1.5-2.58.16-4.84-.36-6.55-2.2l-.21.18c.13.41-.02,1.27.25,1.78.29.53,1.42,1.16,2,1.48,1.35.75,3,1.06,4.5.75,1.77-.37,3.24-1.37,4.83-2.15,1.78-.88,4.06-.6,5.77-1.6.99-.58,1.41-1.54.91-2.61-1.18,1.87-3.47,1.24-5.6,1.96-.76.26-1.36.58-1.92.92Z"/><path class="g" d="m9.18,119.57c-.88-.76-2.02-1.23-3.31-1.47h0c-2.57,1.02-4.98,1.89-5.33,5.83.04.05.08.09.12.13,1.71,1.84,3.97,2.36,6.55,2.2,1.86-.11,2.84-.82,4-1.5,0-2.41-.76-4.1-2.03-5.19Z"/><path class="g" d="m43.29,125.27c1.14.86,2.23,1.81,3.44,2.38l.06-.13h0c0-.08-.48-3.55.5-5.58.11-.22.23-.43.36-.62-1.46-.98-2.4-1.82-5.53-3.29-.18-.09-.37-.11-.58-.11-.81,0-1.84.44-3.42-.64,0,0,0,0-.01-.01,0,0,0,0-.01-.01-.39-.33-.55-.97-.48-2.13-1.36,1.33.1,4.26.17,5.73,0,.18.04.36.08.52h0c.54,1.91,3.43,2.42,5.41,3.9Z"/><path class="g" d="m46.79,127.52h0s-.06.13-.06.13c.98.46,2.05.67,3.31.37,1.45-.34,4.37-2.5,5.03-4.07h-.03c.31-3.21-1.14-4.13-3.05-4.82-1.15-.13-3.19.52-4.34,2.19-.13.19-.25.4-.36.62-.98,2.04-.5,5.51-.5,5.58Z"/><path class="g" d="m18.07,114.46c-.11,1.64-1.68,1.52-2.9.88-.19.21-.46.39-.82.54-1.1,1.45-4.17,2.33-5.15,3.68l-.02.02c1.27,1.1,2.03,2.78,2.03,5.19.56-.33,1.16-.66,1.92-.92,2.13-.72,4.42-.09,5.6-1.96.15-.24.29-.53.4-.87.44-1.32.24-5.63-.28-6.72.04-.05-.69.16-.77.17,0,0,0,0,0,0Z"/><path class="g" d="m55.21,123.93l-.11-.05s-.01.04-.02.06c-.66,1.57-3.58,3.73-5.03,4.07-1.26.3-2.33.09-3.31-.37-1.22-.57-2.3-1.53-3.44-2.38-1.98-1.48-4.88-1.99-5.41-3.9h0l-.17-.02h0c-.08.85-.07,1.19.17,2,1.71,1.13,3.42,1.43,5.04,2.75,1.52,1.24,3.64,2.92,5.54,3.42,2.79.73,8.83-3,6.75-5.58Z"/><path class="g" d="m14.35,115.88c.18-.24.31-.5.37-.78.3-1.52-.67-2.2-2.01-2.33-.89-.09-1.29-.02-1.47.17-.33.33.03,1.04-.53,1.84-1.29,1.85-3.1,2.62-4.84,3.32h0c1.29.25,2.42.72,3.31,1.48l.02-.02c.98-1.35,4.05-2.23,5.15-3.68Z"/><path class="g" d="m42.13,118.02c3.12,1.48,4.07,2.31,5.53,3.29,1.15-1.67,3.19-2.32,4.34-2.19-1.29-.47-2.8-.83-4.12-1.74-1.32-.91-1.88-3.45-3.16-3.75-2.07-.49-3.34,2.21-2.59,4.38Z"/><path class="f" d="m38.11,117.26s0,0,.01.01c1.57,1.08,2.61.64,3.42.64v-.05c-.42-1.08-.5-3,.42-3.73.19-.15.43-.29.7-.4-.61-3.11-.02-8.83-.29-12.99-.15-2.34-1.24-3.84-1.79-5.97-.5-1.93-.21-4.28-.21-6.33l-.06-.11c-2.91,1.62-5.46,1.99-8.94,1.88v.06c3.33,4.67,1,9.51,2.83,13.53,1.09,2.4,2.12,4.91,2.84,7.47.3,1.05.49,2.11.82,3.17.04.11.06.25.08.42.11.85.07,2.25.14,2.39,0,0,0,0,.01.01Z"/><path class="g" d="m15.18,115.34c1.1-1.19-.33-3.14-2.06-3.24-.63-.04-1.31.17-1.91.75l.03.08h0c.18-.19.58-.26,1.47-.17,1.34.14,2.31.81,2.01,2.33-.06.28-.18.54-.37.78.36-.15.63-.33.82-.54Z"/><path class="f" d="m13.12,112.1c1.73.1,3.15,2.06,2.06,3.24,1.22.64,2.79.76,2.9-.88,0,0,0,0,0,0,.44-6.3,2.72-7.82,4.43-12.03.93-2.3,1.08-3.57,1.04-6-.02-1.44.31-2.73.92-5.04-3.16.07-5.78-.38-8.7-1.35h0s0,.03,0,.03c.62.19-.26,3.01-.55,3.85-.68,1.98-1.59,3.61-1.83,6-.37,3.7-.25,9.74-.25,12v.16s0,0,0,0Z"/><path class="g" d="m42.13,118.02c-.75-2.17.52-4.87,2.59-4.38-.31-.4-1.28-.25-2.05.08-.27.12-.52.26-.7.4-.92.73-.83,2.65-.42,3.73v.05c.21,0,.4.02.58.11Z"/><path class="d" d="m24.46,91.4c.41,0,.82-.03,1.25-.05v-.08c-.39-2.64.55-7.91.58-11.6-.29-.12-.53-.25-.75-.39-.22,3.63-1.28,8.27-1,11.83-.03.1-.05.2-.08.3Z"/><path class="d" d="m37.32,73.3c.13.46.27.93.4,1.4,1.24,4.34,2.55,8.87,3.99,12.74l.02.03c.33-.21.66-.45,1-.7-2.68-6.11-4.05-12.42-5.09-16.54-.32.21-.67.39-1.02.55h0s.03.2.03.2c.22.76.44,1.54.67,2.32Z"/><path class="d" d="m25.71,91.27v.08c.43-.03.86-.06,1.31-.1.06-2.15.41-7.2.53-8.98h.01c-.31-.86-.65-1.7-1.01-2.5-.09-.03-.17-.07-.25-.1-.03,3.69-.97,8.96-.58,11.6Z"/><path class="d" d="m15.54,76.85h0c.79-.11,3.79-1.19,2.63-2.89-.91.54-1.69,1.25-2.46,1.39h-.02c-.05.5-.1,1-.16,1.5h0Z"/><path class="d" d="m20.4,74.08c.26.04,1.05.04,1.28,0,.08-.72-.01-1.55-.24-2.14-.38-.03-.76-.06-1.15-.1v.02c.08.83-.04,1.31.11,2.23Z"/><path class="d" d="m37.46,74.77h0s.25-.07.25-.07c-.13-.47-.27-.94-.4-1.4l-.19.05h0c-1.39.21-3.1-.06-4.4-.41-.07.41-.06.98,0,1.39,2.13.51,4.8.46,4.74.43Z"/><path class="d" d="m26.54,79.76c.36.8.7,1.64,1.01,2.5.9,2.5,1.5,5.2,1.35,7.81.88.06,1.7.11,2.48.13,3.47.11,6.03-.27,8.94-1.88.46-.25.93-.54,1.41-.86l-.02-.03c-1.44-3.87-2.75-8.4-3.99-12.74l-.25.07h0c.06.03-2.61.08-4.74-.43-.06-.41-.07-.98,0-1.39,1.31.35,3.01.61,4.4.41h0s.19-.05.19-.05c-.23-.79-.45-1.56-.67-2.32l-.03-.2h0c-1.49.66-3,.8-2.86.38-.46-.25,1.18-1.03,2.38-1.53-1.01.39-2.44.91-3.18,1v.04c-.6.19-1.26.38-1.98.55.34.59.46,1.46.79,2.09-.23.14-.74.34-1.13.43v-.05s-.01,0-.01,0c-.63-.54-1.07-1.32-1.16-2.15-2.23.41-4.9.63-8.02.4.22.59.31,1.43.24,2.14-.23.04-1.02.04-1.28,0-.15-.92-.02-1.4-.11-2.23v-.02c-.72-.08-1.46-.18-2.22-.3.1.37.21.89.11,1.38-.44-.02-.72-.13-1.12-.3.05-.5-.02-.84-.03-1.27-.24-.05-.48-.09-.73-.15-.32,1.37-.48,2.76-.62,4.15h.02c.77-.14,1.55-.84,2.46-1.39,1.16,1.7-1.83,2.78-2.63,2.89h0s0,0,0,0c-.1.97-.23,1.95-.41,2.92-.59,3.08-1.16,5.92-2.39,9.14,1.06.44,2.06.82,3.03,1.14,2.91.97,5.54,1.42,8.7,1.35.03-.1.05-.2.08-.3-.28-3.56.78-8.2,1-11.83.22.14.46.27.75.39.08.03.16.07.25.1Z"/><path class="d" d="m17.07,72.61c.4.17.68.28,1.12.3.1-.49,0-1.02-.11-1.38-.34-.06-.68-.12-1.03-.19,0,.43.08.77.03,1.27Z"/><path class="d" d="m30.63,73.68h0s.01.06.01.06c.39-.09.9-.29,1.13-.43-.33-.63-.45-1.5-.79-2.09-.48.12-.99.22-1.52.32.1.83.54,1.61,1.16,2.15Z"/><path class="f" d="m37.25,69.17c-.1.04-.54.22-1.1.44.55-.23,1-.41,1.1-.44Zm-.68-.88s-.32.1-.75.23c.42-.14.72-.22.75-.23Zm2.6.24l.04.02c1.25-2.97,9.58-9.62,9.5-14.2-.04-2.48-2.61-5.52-3.82-7.48-1.18,1.94-2.41,3.27-4.48,4.45,1.02,1.76,1.97,3.13,2.34,4.28l.25.14h0c-1.31,1.62-2.58,4.52-4.84,8.9l-.18-.09c.12-.22-.39-.74-.66-.94,0,0-.01,0-.02-.01-.26,1.12-.68,1.88-.98,2.1-1.05.75-5.78.46-5.25,1.58.38.82,5.36-.29,5.17-.22-.27.31-5.3,1.36-5.17,2.19.25.55,3.28-.28,4.74-.72-1.28.42-3.65,1.33-3.16,2.1.08.01.19,0,.32,0,.74-.09,2.17-.61,3.18-1-1.2.5-2.85,1.28-2.38,1.53-.14.43,1.38.28,2.86-.38.35-.16.7-.34,1.02-.55.69-.45,1.27-1.01,1.54-1.7Z"/><path class="f" d="m5.35,41.34c.35,4.19.9,9.7,2.44,13.11,3.83,8.5,5.83,3.17,7.33,1.67h.05c.01-.52.03-1.02.04-1.51.04-1.41.06-2.38.1-3.18-1.74-.55-3.43-1.52-4.22-2.48-.41-.5-.58-.99-.38-1.43-.63-2.34-1.43-4.86-2.41-6.72.91-.62,1.22-1.96.45-2.83-.05-.06-.1-.11-.16-.16-.33-.29-1.15-.5-2.02-.63-.54-.08-1.1-.13-1.57-.14-.6-.02-1.05.01-1.14.09-.01.28.03.5.1.69h-.03c-.05-.07-.1-.17-.14-.27-.08.47-.23,1.03-.62,1.2.11,1.15.8,2.39,1.99,2.61l.19-.02Z"/><path class="h" d="m11.09,48.94c-.12-.46-.24-.94-.38-1.43-.2.44-.03.93.38,1.43Z"/><path class="h" d="m22.13,36.27c-.24.3-.19.73-.33,1.08.1,3.38,2.22,4.81,5.75,4.58,3-.2,5.85-3.97,5.02-5.84-.23-.51-.73-.88-1.58-.99.02.16.04.33.06.5,1.61,4.02-7.48,8.35-7.83,1.17-.01-.26-.01-.54,0-.84-.61,0-.92.14-1.08.34Z"/><path class="f" d="m3.96,37.8c-.08-.18-.12-.41-.1-.69.09-.08.54-.11,1.14-.09-.17-.57-.2-1.3-.13-1.96-1.14-2.18-1.58-.89-1.47.67.05.63.18,1.3.4,1.8.04.1.09.19.14.28h.03Z"/><path class="f" d="m3.8,37.54c-.22-.5-.36-1.18-.4-1.8h-.03c-1.5-2.11-1.75,2.36-.33,3.05.05,0,.09-.02.14-.04.39-.17.54-.73.62-1.2Z"/><path class="f" d="m30.98,35.1c-.06-.51-.1-1-.12-1.5-.02-.46,0-.94.02-1.44,0,0,0,0,0,0-.83.35-1.65.93-2.21,1.24-1.73.97-3.93,1.69-5.37,1.81v.14c.03.57-.01.75-.01,1.42h-.08s0,0,0,0c.35,7.18,9.44,2.85,7.83-1.17-.02-.17-.04-.33-.06-.5Z"/><path class="h" d="m18.07,71.53c.77.13,1.51.23,2.23.3.39.04.77.08,1.15.1,3.12.23,5.78.01,8.02-.4.53-.1,1.04-.21,1.52-.32.71-.17,1.37-.36,1.98-.55v-.04c-.13.02-.24.02-.32,0-.48-.77,1.88-1.68,3.16-2.1-1.46.44-4.49,1.27-4.74.72-.13-.83,4.89-1.88,5.17-2.19.2-.07-4.78,1.04-5.17.22-.53-1.12,4.21-.83,5.25-1.58.31-.22.72-.98.98-2.1,0,0,.01,0,.02.01-.16-4.3.22-9.09-.36-12.93l.03-.02c.33.62.68,1.22,1.05,1.79.9-.37,1.68-.74,2.37-1.13,2.07-1.18,3.3-2.52,4.48-4.45.39-.63.77-1.33,1.17-2.1-1.87-1.86-5.52-6.33-7.85-8-.87-.62-2.16-.83-5.64-.67.83,1.87-2.02,5.64-5.02,5.84-3.53.23-5.65-1.21-5.75-4.58.15-.35.09-.78.33-1.08l-.08-.09c-4.83.25-6.18,1.68-7.17,2.75-2.17,2.34-3.08,6.2-4.17,8.57.13.49.26.96.38,1.43.79.96,2.48,1.92,4.22,2.48-.04.81-.07,1.77-.1,3.18-.01.49-.02.99-.04,1.51-.08,3.1-.15,6.63.04,9.66.25,4.13.67,5.33.67,5.33.15.03.29.06.44.09.24.05.49.1.73.15.35.07.69.13,1.03.19Z"/><path class="f" d="m6.57,37.17c.87.13,1.68.34,2.02.63.06.05.11.11.16.16l.07-.05c-.72-2.68-.34-8.26-2.83-8.02-.88.14.44,2.48.57,4.78h-.11c-.8-2.12-1.45-1.07-1.6.4-.06.65-.03,1.39.13,1.96.47.02,1.03.06,1.57.14Z"/><path class="e" d="m30.87,33.6h0c2.28.2,4.88.71,7.19.77-2.47-.71-4.9-1.39-7.18-2.21-.03.51-.04.98-.02,1.44h0Z"/><path class="c" d="m17.12,20.59c0,.87.38,1.58.85,1.58.47,0,.84-.7.85-1.58,0-.87-.38-1.58-.84-1.58-.47,0-.85.7-.85,1.58Z"/><path class="c" d="m28.41,20.69c0,.81.44,1.46.98,1.46.55,0,.99-.65.99-1.45,0-.8-.44-1.45-.99-1.45-.54,0-.98.65-.98,1.45Z"/><path class="e" d="m12.08,15.03c.82,4.64.24,12.61-2.16,16.75,3.6,1.48,6.68,2.25,10.56,2.5-1.92-1.06-4.42-2.73-5.19-3.74-2.8-3.67-.94-9.68-.99-10.67-.07-1.17-.97-2.91-1.66-4.98v-.03s0,0,0,0c-.19.04-.37.09-.55.14v.03Z"/><path class="f" d="m20.47,34.28c.66.37,1.26.66,1.69.84.26.1.66.13,1.14.09,1.44-.13,3.64-.84,5.37-1.81.55-.31,1.38-.89,2.21-1.24-.68-.24-1.35-.5-2-.77,4.23-4.84,5.13-8.16,5.21-15.36l.04-.15c-1.35-.35-2.73-.72-4.12-1.11-.47-2.67-.12-5.16-.41-7.96-.34,2.5-1.4,5.4-2.23,7.82-3.24-.9-9.92-.89-14.75.23h0s0,.03,0,.03c.69,2.08,1.59,3.81,1.66,4.98.06.99-1.8,6.99.99,10.67.77,1.01,3.27,2.67,5.19,3.74Zm-2.5-12.11c-.47,0-.85-.71-.85-1.58,0-.87.38-1.58.85-1.58.47,0,.84.71.84,1.58,0,.87-.38,1.58-.85,1.58Zm11.42-.02c-.54,0-.98-.65-.98-1.46,0-.8.44-1.45.98-1.45.55,0,.99.65.99,1.45,0,.81-.44,1.45-.99,1.45Z"/><path class="e" d="m38.06,34.37c.17.05.34.1.5.14.89-1.84,1.85-3.34,2.47-5.35,2.33-7.66,2.61-12.91.19-18.25-1.49-3.28-4.63-9.7-10.03-8.8,0,0-1.25-1.73-2.77-1.6-11.49-.01-18.52,6.39-19.89,15.9.89-.58,2.11-1.04,3.53-1.41.18-.05.37-.09.55-.14,4.83-1.12,11.51-1.14,14.75-.23.82-2.43,1.88-5.32,2.23-7.82.29,2.8-.06,5.29.41,7.96,1.39.39,2.77.76,4.12,1.11l-.04.15c-.08,7.2-.98,10.52-5.21,15.36.65.27,1.32.52,2,.77,0,0,0,0,0,0,0,0,0,0,0,0,2.28.82,4.71,1.5,7.18,2.21Z"/><line class="b" x1="37.72" y1="74.7" x2="37.47" y2="74.77"/><line class="b" x1="30.63" y1="73.68" x2="30.64" y2="73.74"/><polyline class="b" points="37.32 73.3 37.32 73.3 37.13 73.35"/><line class="b" x1=".66" y1="124.07" x2=".45" y2="124.24"/><polyline class="b" points="46.8 127.52 46.79 127.52 46.73 127.65"/><line class="b" x1="55.04" y1="123.93" x2="55.07" y2="123.95"/><polyline class="b" points="9.2 119.55 9.18 119.57 9.18 119.57"/><polyline class="b" points="55.1 123.89 55.1 123.89 55.21 123.93"/><line class="b" x1="37.88" y1="121.37" x2="37.7" y2="121.35"/><line class="b" x1="5.87" y1="118.09" x2="5.88" y2="118.1"/><line class="b" x1="41.54" y1="117.85" x2="41.55" y2="117.91"/><line class="b" x1="11.21" y1="112.85" x2="11.24" y2="112.93"/><line class="b" x1="13.13" y1="111.93" x2="13.12" y2="112.1"/><line class="b" x1="25.71" y1="91.27" x2="25.72" y2="91.34"/><polyline class="b" points="15.77 90.05 15.76 90.08 15.76 90.08"/><line class="b" x1="31.38" y1="90.21" x2="31.38" y2="90.27"/><polyline class="b" points="40.32 88.32 40.32 88.32 40.38 88.43"/><line class="b" x1="41.71" y1="87.43" x2="41.73" y2="87.46"/><line class="b" x1="27.55" y1="82.26" x2="27.54" y2="82.26"/><line class="b" x1="15.54" y1="76.85" x2="15.54" y2="76.85"/><line class="b" x1="15.69" y1="75.35" x2="15.71" y2="75.35"/><line class="b" x1="20.3" y1="71.83" x2="20.29" y2="71.85"/><polyline class="b" points="32.95 70.62 32.95 70.62 32.96 70.66"/><line class="b" x1="36.62" y1="70.77" x2="36.65" y2="70.97"/><polyline class="b" points="39.18 68.53 39.21 68.55 39.22 68.55"/><line class="b" x1="37.98" y1="64.55" x2="38.16" y2="64.65"/><line class="b" x1="42.75" y1="55.6" x2="43" y2="55.74"/><line class="b" x1="36.99" y1="50.67" x2="36.96" y2="50.68"/><line class="b" x1="36.99" y1="50.66" x2="36.99" y2="50.66"/><line class="b" x1="23.29" y1="36.77" x2="23.21" y2="36.77"/><polyline class="b" points="22.04 36.18 22.13 36.27 22.13 36.28"/><line class="b" x1="23.3" y1="35.21" x2="23.29" y2="35.35"/><line class="b" x1="30.88" y1="33.6" x2="30.87" y2="33.6"/><line class="b" x1="12.07" y1="15" x2="12.08" y2="15.03"/><line class="b" x1="12.62" y1="14.87" x2="12.63" y2="14.89"/><line class="b" x1="34.13" y1="15.88" x2="34.09" y2="16.02"/><path class="b" d="m28.43.51c-11.49-.01-18.52,6.39-19.89,15.9.89-.58,2.11-1.04,3.53-1.41.18-.05.37-.09.55-.14,4.83-1.12,11.51-1.14,14.75-.23.82-2.43,1.88-5.32,2.23-7.82.29,2.8-.06,5.29.41,7.96,1.39.39,2.77.76,4.12,1.11,1.07.27,2.12.53,3.15.77,1.18-2.84,0-8.17-3.66-11.22"/><path class="b" d="m20.5,34.28s-.02,0-.03,0c-3.88-.25-6.96-1.02-10.56-2.5,2.41-4.14,2.99-12.11,2.16-16.75"/><path class="b" d="m28.43.51c1.52-.14,2.77,1.6,2.77,1.6,5.4-.9,8.54,5.52,10.03,8.8,2.42,5.34,2.13,10.6-.19,18.25-.61,2.01-1.58,3.51-2.47,5.35-.17-.05-.34-.1-.5-.14-2.47-.71-4.9-1.39-7.18-2.21,0,0,0,0,0,0-.68-.24-1.35-.5-2-.77,4.23-4.84,5.13-8.16,5.21-15.36"/><path class="b" d="m12.63,14.89c.69,2.08,1.59,3.81,1.66,4.98.06.99-1.8,6.99.99,10.67.77,1.01,3.27,2.67,5.19,3.74.66.37,1.26.66,1.69.84.26.1.66.13,1.14.09,1.44-.13,3.64-.84,5.37-1.81.55-.31,1.38-.89,2.21-1.24,0,0,0,0,0,0"/><path class="b" d="m16.61,17.8c.31-1.11,1.35-.86,1.66-.17"/><path class="b" d="m27.82,16.85c.73-.73,1.83-.76,2.77.45"/><path class="b" d="m21.62,23.07c-.38,1-.59,1.66-1.74,1.23.3,1.11.61,1.32,1.53,1.82"/><path class="b" d="m20.09,28.61c1.15,1.28,3.91,1.25,4.88,0"/><path class="b" d="m30.88,33.6c2.28.2,4.88.71,7.19.77.1,0,.2,0,.3,0"/><path class="b" d="m18.82,20.59c0,.87-.38,1.58-.85,1.58-.47,0-.85-.71-.85-1.58,0-.87.38-1.58.85-1.58.47,0,.84.71.84,1.58Z"/><path class="b" d="m30.38,20.69c0,.81-.44,1.45-.99,1.45-.54,0-.98-.65-.98-1.46,0-.8.44-1.45.98-1.45.55,0,.99.65.99,1.45Z"/><path class="b" d="m23.21,35.93c-.01.3-.01.58,0,.84.35,7.18,9.44,2.85,7.83-1.17"/><path class="b" d="m37.36,64.56c-.02-.31-.03-.63-.04-.95-.16-4.3.22-9.09-.36-12.93"/><path class="b" d="m16.54,42.93c-.88,5.31-1.12,6.31-1.23,8.48-.04.81-.07,1.77-.1,3.18-.01.49-.02.99-.04,1.51-.08,3.1-.15,6.63.04,9.66.25,4.13.67,5.33.67,5.33.15.03.29.06.44.09.24.05.49.1.73.15.35.07.69.13,1.03.19.77.13,1.51.23,2.23.3.39.04.77.08,1.15.1,3.12.23,5.78.01,8.02-.4.53-.1,1.04-.21,1.52-.32.71-.17,1.37-.36,1.98-.55"/><path class="b" d="m30.96,35.1s.02,0,.02,0c.85.11,1.36.48,1.58.99.83,1.87-2.02,5.64-5.02,5.84-3.53.23-5.65-1.21-5.75-4.58.15-.35.09-.78.33-1.08.17-.2.47-.34,1.08-.34"/><path class="b" d="m33.71,44.93c1.33,1.77,2.25,3.83,3.28,5.73h0c.33.62.68,1.22,1.05,1.79.9-.37,1.68-.74,2.37-1.13,2.07-1.18,3.3-2.52,4.48-4.45.39-.63.77-1.33,1.17-2.1-1.87-1.86-5.52-6.33-7.85-8-.87-.62-2.16-.83-5.64-.67,0,0-.01,0-.02,0"/><path class="b" d="m22.04,36.18c-4.83.25-6.18,1.68-7.17,2.75-2.17,2.34-3.08,6.2-4.17,8.57-.2.44-.03.93.38,1.43.79.96,2.48,1.92,4.22,2.48.02,0,.04.01.07.02"/><path class="b" d="m15.21,53.93c-.92,3.33-.58,2.42-1,3.08"/><path class="b" d="m40.38,51.27s.02.04.03.05c1.02,1.76,1.97,3.13,2.34,4.28"/><path class="b" d="m38.08,64.79s.05-.09.07-.14c2.26-4.38,3.54-7.28,4.84-8.9.4-.5.81-.88,1.25-1.15"/><path class="b" d="m44.88,46.85s0,.01.01.02c1.21,1.96,3.78,5,3.82,7.48.08,4.57-8.24,11.23-9.5,14.2-.02.06-.05.12-.07.18"/><path class="b" d="m16.38,70.93c-.02.09-.04.17-.06.26-.32,1.37-.48,2.76-.62,4.15-.05.5-.1,1-.16,1.5-.1.97-.23,1.95-.41,2.92-.59,3.08-1.16,5.92-2.39,9.14,1.06.44,2.06.82,3.03,1.14,2.91.97,5.54,1.42,8.7,1.35.41,0,.82-.03,1.25-.05.42-.03.86-.06,1.3-.1.06-2.15.41-7.2.53-8.98"/><path class="b" d="m26.54,79.76c.36.8.7,1.64,1.01,2.5.9,2.5,1.5,5.2,1.35,7.81.88.06,1.7.11,2.48.13,3.47.11,6.03-.27,8.94-1.88.46-.25.93-.54,1.41-.86.33-.21.66-.45,1-.7-2.68-6.11-4.05-12.42-5.09-16.54,0-.01,0-.03-.01-.04"/><path class="b" d="m23.29,77.43c1.07.83,1.55,1.39,2.25,1.84.22.14.46.27.75.39.08.03.16.07.25.1,1.5-1,2.46-2.03,2.92-3.08"/><path class="b" d="m15.71,75.35c.77-.14,1.55-.85,2.46-1.39,1.16,1.7-1.83,2.78-2.63,2.89"/><path class="b" d="m36.65,70.97c.22.76.44,1.54.67,2.32.13.46.27.93.4,1.4,1.24,4.34,2.55,8.87,3.99,12.74"/><path class="b" d="m25.54,79.27s0,0,0,0c-.22,3.63-1.28,8.27-1,11.83"/><path class="b" d="m24.04,72.1c.25,2.5,1.16,4.84,1.33,4.67"/><path class="b" d="m26.04,72.02c.25,1.33.42,2.5.42,2.5"/><path class="b" d="m20.29,71.85c.08.83-.04,1.31.11,2.23.26.04,1.05.04,1.28,0,.08-.72-.01-1.55-.24-2.14-.02-.06-.04-.11-.07-.17"/><path class="b" d="m17.04,71.1c0,.08,0,.16,0,.24,0,.43.08.77.03,1.27.4.17.68.28,1.12.3.1-.49,0-1.02-.11-1.38,0-.03-.02-.06-.03-.09"/><path class="b" d="m26.29,79.6v.07c-.03,3.69-.97,8.96-.58,11.6"/><path class="b" d="m15.54,90.1c.09-.03.16-.04.22-.02.62.19-.26,3.01-.55,3.85-.68,1.98-1.59,3.61-1.83,6-.37,3.7-.25,9.74-.25,12"/><path class="b" d="m24.54,91.1c-.03.1-.05.2-.08.3-.62,2.31-.95,3.59-.92,5.04.04,2.43-.1,3.7-1.04,6-1.71,4.21-3.99,5.73-4.43,12.03-.01.18-.02.37-.03.56"/><path class="b" d="m31.38,90.27c3.33,4.67,1.01,9.51,2.83,13.53,1.09,2.4,2.12,4.91,2.84,7.47.3,1.05.49,2.11.82,3.17.04.11.06.25.08.42.11.85.07,2.25.14,2.39,0,0,0,.01.01.01.02,0,.05-.1.1-.32"/><path class="b" d="m40.38,88.43c0,2.05-.29,4.4.21,6.33.55,2.12,1.64,3.62,1.79,5.97.27,4.15-.33,9.88.29,12.99.01.07.03.15.05.22"/><path class="b" d="m.54,123.93c.35-3.95,2.76-4.81,5.33-5.84,1.74-.7,3.55-1.47,4.84-3.32.56-.8.2-1.5.53-1.84.18-.19.58-.26,1.47-.17,1.34.14,2.31.81,2.01,2.33-.06.28-.18.54-.37.78-1.1,1.45-4.17,2.33-5.15,3.68"/><path class="b" d="m11.21,124.93c0-.06,0-.11,0-.17,0-2.41-.76-4.1-2.03-5.19-.88-.76-2.02-1.23-3.31-1.47"/><path class="b" d="m11.21,112.85c.6-.58,1.28-.79,1.91-.75,1.73.1,3.15,2.06,2.06,3.24-.19.21-.46.39-.82.54-.05.02-.09.04-.14.05"/><path class="b" d="m.54,123.93s.08.09.12.13c1.71,1.84,3.97,2.36,6.55,2.2,1.86-.11,2.84-.82,4-1.5.56-.33,1.16-.66,1.92-.92,2.13-.72,4.42-.09,5.6-1.96.15-.24.29-.53.4-.87.44-1.32.24-5.63-.28-6.72.04-.05-.69.16-.77.17,0,0,0,0,0,0-.11,1.64-1.68,1.52-2.9.88-.04-.02-.09-.05-.13-.07"/><path class="b" d="m37.96,114.85s0,0,0,0c-.13.08-.24.17-.34.26-1.36,1.33.1,4.26.17,5.73,0,.18.04.36.08.52h0c.54,1.91,3.43,2.42,5.41,3.9,1.14.86,2.23,1.81,3.44,2.38.98.46,2.05.67,3.31.37,1.45-.34,4.37-2.5,5.03-4.07,0-.02.02-.04.02-.06.06-.16.1-.31.11-.45"/><path class="b" d="m42.13,118.02c-.75-2.17.52-4.87,2.59-4.38,1.29.3,1.84,2.84,3.16,3.75,1.32.9,2.82,1.27,4.12,1.74,1.91.69,3.36,1.61,3.05,4.81"/><path class="b" d="m47.71,121.35s-.04-.03-.06-.04c-1.46-.98-2.4-1.82-5.53-3.29-.18-.09-.37-.11-.58-.11-.81,0-1.84.44-3.42-.64,0,0,0,0-.01-.01,0,0,0,0-.01-.01-.39-.33-.55-.97-.48-2.13,0-.03,0-.07,0-.1"/><path class="b" d="m37.71,121.27s0,.06,0,.08c-.08.85-.07,1.19.17,2,1.71,1.13,3.42,1.43,5.04,2.75,1.52,1.24,3.64,2.92,5.54,3.42,2.79.73,8.83-3,6.75-5.58"/><path class="b" d="m41.54,117.85c-.42-1.08-.5-3,.42-3.73.19-.15.43-.29.7-.4.77-.33,1.74-.48,2.05-.08"/><line class="b" x1="46.79" y1="127.52" x2="46.79" y2="127.52"/><path class="b" d="m52.29,119.18c-.09-.03-.19-.04-.3-.06-1.15-.13-3.19.52-4.34,2.19-.13.19-.25.4-.36.62-.98,2.04-.5,5.51-.5,5.58h0"/><path class="b" d="m.38,124.1s.06.09.08.14c.13.41-.02,1.27.25,1.78.29.53,1.42,1.16,2,1.48,1.35.75,3,1.06,4.5.75,1.77-.37,3.24-1.37,4.83-2.15,1.78-.88,4.06-.6,5.77-1.6.99-.58,1.41-1.54.91-2.61,0-.01,0-.02-.02-.04"/><path class="b" d="m30.89,32.15s0,0,0,0c-.03.51-.04.98-.02,1.44.02.5.06.99.12,1.5.02.16.04.33.06.5"/><path class="b" d="m23.29,35.35c.04.57,0,.75,0,1.42"/><path class="b" d="m35.8,68.52c-1.46.44-4.49,1.27-4.74.72-.13-.83,4.89-1.88,5.17-2.19.2-.07-4.78,1.04-5.17.22-.53-1.12,4.21-.83,5.25-1.58.31-.22.72-.98.98-2.1,0,0,.01,0,.02.01.27.2.78.72.66.94-.03.05-.1.09-.22.1"/><path class="b" d="m36.58,68.28s0,0,0,0c-.03,0-.32.1-.75.23"/><path class="b" d="m35.82,68.52c.42-.14.72-.22.75-.23"/><path class="b" d="m35.82,68.52s-.01,0-.02,0"/><path class="b" d="m36.14,69.62c-1.01.39-2.44.91-3.18,1-.13.02-.23.02-.32,0-.48-.77,1.88-1.68,3.16-2.1"/><path class="b" d="m37.28,69.16s0,0,0,0h0s0,0,0,0c0,0,0,0-.01,0-.1.04-.54.22-1.1.44"/><path class="b" d="m36.15,69.61c.55-.23,1-.41,1.1-.44"/><path class="b" d="m36.15,69.61s0,0-.01,0"/><path class="b" d="m39.2,66.88c.2.61.17,1.16-.03,1.65-.27.68-.85,1.25-1.54,1.7-.32.21-.67.39-1.02.55-1.49.66-3,.81-2.86.38-.46-.25,1.18-1.03,2.38-1.53"/><path class="b" d="m30.32,73.79c.09,0,.2-.03.32-.05.39-.09.9-.29,1.13-.43-.33-.63-.45-1.5-.79-2.09,0,0,0-.02-.02-.03"/><path class="b" d="m37.13,73.35c-1.39.21-3.1-.06-4.4-.41-.07.41-.06.98,0,1.39,2.13.51,4.8.46,4.74.43,0,0,0,0,0,0"/><path class="b" d="m29.46,71.52s0,.01,0,.02c.1.83.54,1.61,1.16,2.15,0,0,0,0,0,0"/><line class="b" x1="5.35" y1="41.34" x2="5.16" y2="41.35"/><line class="b" x1="3.96" y1="37.8" x2="3.94" y2="37.81"/><line class="b" x1="8.82" y1="37.91" x2="8.75" y2="37.96"/><line class="b" x1="3.4" y1="35.73" x2="3.37" y2="35.74"/><line class="b" x1="6.56" y1="34.67" x2="6.46" y2="34.67"/><path class="b" d="m12.45,53.94c-.31-.62-.75-2.62-1.36-5.01-.12-.46-.24-.94-.38-1.43-.63-2.34-1.43-4.86-2.41-6.72,0,0,0,0,0-.01"/><path class="b" d="m15.12,56.11c-1.5,1.5-3.5,6.83-7.33-1.67-1.54-3.41-2.09-8.92-2.44-13.11,0,0,0-.02,0-.03"/><path class="b" d="m7.39,41.11c.35-.03.66-.15.92-.33.91-.62,1.22-1.96.45-2.83-.05-.06-.1-.11-.16-.16-.33-.29-1.15-.5-2.02-.63-.54-.08-1.1-.13-1.57-.14-.6-.02-1.05.01-1.14.09-.01.28.03.5.1.69.55,1.29,3.07.54,3.21,1.6"/><path class="b" d="m3.37,35.74c-1.5-2.11-1.75,2.36-.33,3.04.05,0,.09-.02.14-.04.39-.17.54-.73.62-1.2,0,0,0,0,0-.01"/><path class="b" d="m5.16,41.35c-1.18-.22-1.88-1.47-1.99-2.61,0-.07-.01-.14-.01-.21"/><path class="b" d="m8.82,37.91c-.72-2.68-.34-8.26-2.83-8.02-.88.14.44,2.48.57,4.78.01.17.01.34,0,.51"/><path class="b" d="m5.03,37.11s-.02-.06-.03-.09c-.17-.57-.2-1.3-.13-1.96.15-1.47.8-2.53,1.6-.4"/><path class="b" d="m3.94,37.81c-.05-.08-.1-.18-.14-.28-.22-.5-.36-1.18-.4-1.8-.12-1.56.32-2.85,1.47-.67,0,0,0,0,0,.01"/><path class="b" d="m6.66,35.83c-.12.43-.15.89-.08,1.34,0,.02,0,.03,0,.05"/></svg>')}`;
export default image;