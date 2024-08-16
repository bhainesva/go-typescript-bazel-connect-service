package main

import (
	"github.com/bazelbuild/rules_go/examples/basic-gazelle/cmd"
	"k8s.io/klog/v2"
)

func main() {
	klog.InitFlags(nil)
	cmd.Execute()
}
