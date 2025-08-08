// Adapted from: https://github.com/immerjs/use-immer

import { useState, useCallback } from "react";
import { produce, type Draft, freeze } from "immer";

export type ImmerHook<S> = [S, Updater<S>];
export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;

export function useImmer<S = any>(initialValue: S | (() => S)): ImmerHook<S>;

export function useImmer<T>(initialValue: T) {
    const [val, updateValue] = useState(() => freeze(typeof initialValue === "function" ? initialValue() : initialValue, true));

    return [
        val,
        // @ts-expect-error : ignore the error
        useCallback((updater) => {
            if (typeof updater === "function") updateValue(produce(updater));
            else updateValue(freeze(updater));
        }, []),
    ];
}
