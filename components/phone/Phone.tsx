"use client";
import { AnimatePresence, motion } from "motion/react";
import type { PhoneMode } from "@/lib/constants/scenarios";
type Props={ mode?: PhoneMode; stage?: number; final?: boolean };
const cardCopy = (mode: PhoneMode, stage: number) => {
  if(mode === "reminder") return ["Reminder: Submit iQOO Hackathon entry", "Friday · 9:00 AM", "CREATE REMINDER"];
  if(mode === "ticket") return ["Your train leaves tomorrow · 07:40", "Leave by 06:30?", "REMIND ME"];
  if(mode === "office") return ["Figure added to:", "Hackathon_Presentation.pptx", "OPEN"];
  if(stage < 2) return ["I found the PDF you meant.", "Found from your recent context.", ""];
  if(stage < 4) return ["PDF FOUND", "iQOO_Hackathon_Guide.pdf", ""];
  return ["iQOO_Hackathon_Guide.pdf", "Ready to send to Rahul.", "SEND"];
};
export function Phone({ mode="chat", stage=0, final=false }: Props) {
  const [heading, detail, action] = cardCopy(mode,stage); const showCard = mode !== "chat" || stage >= 2;
  return <div className="phone-shell" aria-label="Simulated THREAD phone interface"><div className="phone-screen"><div className="phone-status"><span>{mode === "ticket" ? "09:42" : "19:18"}</span><span>● ● ●</span></div>
    {mode === "chat" && <><div className="chat-header"><span className="avatar">R</span><div><b>Rahul</b><small>CALL</small></div></div><div className="chat-body"><div className="bubble">Can you send me this?</div><small className="chat-time">19:18</small></div></>}
    {mode === "reminder" && <div className="doc"><span>HACKATHON BRIEF</span><h4>Building for a more intuitive phone.</h4><i/><i/><i className="short"/></div>}
    {mode === "ticket" && <div className="ticket"><span>INDIAN RAILWAYS</span><b>NDLS → LKO</b><small>DEP 07:40 · 03 SEP · C2 / 41</small></div>}
    {mode === "office" && <div className="figure"><i/><i/><i/><i/></div>}
    <AnimatePresence>{showCard && <motion.div className="thread-popup" initial={{ opacity:0, y:48, scale:.94 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:24 }} transition={{ type:"spring", stiffness:240, damping:25 }}><span>THREAD</span><h3>{heading}</h3><p>{detail}</p>{action && <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:.94 }}>{final && stage >= 5 ? "SENT" : action}</motion.button>}</motion.div>}</AnimatePresence>
    {final && stage >= 5 && <motion.div className="sent-state" initial={{opacity:0}} animate={{opacity:1}}>Sent.</motion.div>}</div></div>;
}
